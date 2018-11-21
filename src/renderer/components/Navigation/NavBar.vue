<template>
  <b-navbar toggleable="sm" fixed="top" variant="primary" type="dark">
    <b-navbar-brand to="/">PET</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <!-- Left aligned nav items -->
      <b-navbar-nav>
        <b-nav-item to="/transactions">Transactions</b-nav-item>
        <b-nav-item to="/accounts">Accounts</b-nav-item>
        <b-nav-item to="/categories">Categories</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Settings" right>
          <b-dropdown-item @click.prevent="importData">Import Data</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import controllers from '../../data/controllers'

export default {
  name: 'pet-navbar',
  methods: {
    importData () {
      let csvPath = this.$electron.remote.dialog.showOpenDialog({
        filters: [
          {name: 'CSV', extensions: ['csv']}
        ]
      })
      controllers.imported_transaction.importFile(csvPath[0], [
        'date', 'accountId', 'description', 'credit', 'debit'
      ]).then(() => {
        this.$store.dispatch('refreshImportedTransactions')
      })
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
