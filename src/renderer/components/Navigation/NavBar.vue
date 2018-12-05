<template>
  <b-navbar toggleable="sm" fixed="top" variant="primary" type="dark">
    <b-navbar-brand to="overview">PET</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <!-- Left aligned nav items -->
      <b-navbar-nav>
        <b-nav-item to="overview">Overview</b-nav-item>
        <b-nav-item to="transactions">Transactions</b-nav-item>
        <b-nav-item to="imported_transactions">Imported Transactions</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- Current Operations Section -->
        <b-nav-item-dropdown :disabled="notifications == null || notifications.length === 0" right>
          <template slot="button-content">
            <span>
              <i class="fas fa-bell"></i>&nbsp;
              <b-badge v-if="notifications != null && notifications.length > 0" variant="danger">
                {{ notifications.length }}
              </b-badge>
            </span>
          </template>
          <b-dropdown-item disabled v-for="notification in notifications" :key="notification.id">
            <a href="#" @click.prevent="dismissNotification(notification.id)"><i class="far fa-times-circle"></i></a>&nbsp;
            {{ notification.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Settings" right>
          <b-dropdown-item @click.prevent="importTransactions">Import Bank Statement</b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item @click.prevent="importData">Import Data</b-dropdown-item>
          <b-dropdown-item @click.prevent="exportData">Export Data</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import controllers from '../../data/controllers'
import fs from 'fs'

export default {
  name: 'pet-navbar',
  computed: {
    notifications () {
      return this.$store.state.Notifications.notifications
    }
  },
  methods: {
    dismissNotification (id) {
      console.log(`Dismissing: ${id}`)
      this.$store.dispatch('removeNotification', id)
    },
    importTransactions () {
      let csvPath = this.$electron.remote.dialog.showOpenDialog({
        filters: [
          {name: 'CSV', extensions: ['csv']}
        ]
      })
      this.$store.dispatch('addNotification', { id: 'trans_import', name: 'Importing Transactions' })
      controllers.imported_transaction.importFile(csvPath[0], {
        headers: [
          'date', 'accountId', 'description', 'credit', 'debit'
        ],
        date_format: 'DD/MM/YYYY'
      }).then(async () => {
        await this.$store.dispatch('refreshImportedTransactions')
        this.dismissNotification('trans_import')
        this.$store.dispatch('addNotification', { id: 'trans_import_success', name: 'Sucessfully Imported Transactions' })
      })
    },
    async importData () {
      let importDBPath = await this.$electron.remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          {name: 'PET Database', extensions: ['petdb']}
        ]
      })
      fs.readFile(importDBPath[0], async (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        let dbBlob = new Blob([new Uint8Array(data)])
        await this.$db.import(dbBlob)
        console.log('Imported Data')
      })
    },
    async exportData () {
      let exportSavePath = this.$electron.remote.dialog.showSaveDialog({
        defaultPath: 'pet-export.petdb',
        filters: [{
          name: `PET Database`,
          extensions: ['petdb']
        }]
      })
      this.$store.dispatch('addNotification', { id: 'data_export', name: 'Exporting Data' })
      let dataBlob = await this.$db.export({ prettyJson: true })
      var reader = new FileReader()
      reader.onload = function () {
        var buffer = Buffer.from(reader.result)
        fs.writeFile(exportSavePath, buffer, {}, (err, res) => {
          if (err) {
            console.error(err)
            return
          }
          console.log('file saved')
        })
      }
      reader.readAsArrayBuffer(dataBlob)
    }
  }
}
</script>

<style lang="scss">
  .navbar-brand {
    font-size: 1.6em;
  }
  .navbar {
    height: 60px;
  }
</style>
