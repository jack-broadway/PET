<template>
  <div>
    <b-card header-class="card-header-button">
      <template slot="header">
        <h3>Accounts</h3>
        <b-button variant="primary" class="text-light" @click.stop="newButtonClicked()">New</b-button>
      </template>
      <b-card-body>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center"
            v-for="account in accounts" :key="account.accountId">
            <div>
              <h4>{{ account.name }}</h4>
              <h4 class="mono-font">{{ '$'+(account.balance || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</h4>
            </div>
            <div>
              <b-button variant="primary" class="text-light" @click.stop="editButtonClicked(account.accountId)">Edit</b-button>
              <b-button variant="danger" class="text-light" @click.stop="editButtonClicked(account.accountId)">Delete</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card-body>
    </b-card>
    <b-modal v-model="showEditModal" hide-header hide-footer>
      <pet-account-form :editId="editAccountId" :on_cancel="cancelButtonClicked"/>
    </b-modal>
  </div>
</template>
<script>
import AccountForm from './AccountForm'

export default {
  name: 'pet-account-list',
  components: {
    'pet-account-form': AccountForm
  },
  data () {
    return {
      editAccountId: null,
      showEditModal: false
    }
  },
  computed: {
    accounts () {
      return this.$store.state.Account.accounts
    },
    balances () {
      return this.$store.state
    }
  },
  methods: {
    newButtonClicked () {
      this.editAccountId = null
      this.showEditModal = true
    },
    editButtonClicked (id) {
      this.editAccountId = id
      this.showEditModal = true
    },
    cancelButtonClicked () {
      this.showEditModal = false
    }
  },
  created () {
    this.$store.dispatch('refreshAccountData')
  }
}
</script>
<style lang="scss">
</style>

