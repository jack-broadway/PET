<template>
  <b-container fluid class="mt-2">
    <b-row>
      <b-col md="auto">
        <b-pagination v-model="currentPage" :total-rows="transactions.length"/>
      </b-col>
      <b-col md="auto">
        <b-form-select :options="[10,15,20,50,100]" v-model="perPage" />
      </b-col>
      <b-col md="auto">
        <b-form-input v-model="filter" placeholder="Type to Search" />
      </b-col>
    </b-row>  
    <b-table show-empty striped class="mt-2" :sort-compare="sortTable" :filter="filter"
      :items="transactions" :fields="fields" :per-page="perPage" :current-page="currentPage">
      <template slot="HEAD_checkbox" slot-scope="row">
        <b-form-checkbox @click.native.stop class="table-header-checkbox"/>
      </template>
      <template slot="checkbox" slot-scope="row">
        <b-form-checkbox @click.native.stop class="table-row-checkbox"/>
      </template>
      <template slot="amount" slot-scope="row">
        {{ row.item.debit || row.item.credit }}
      </template>
      <template slot="brief_desc" slot-scope="row">
        {{ (row.item.description).substring(0,20) }}
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          {{ row.item.description }}
        </b-card>
      </template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button size="sm" variant="primary" class="text-light" @click="editButtonClicked(row.item.id)">Edit</b-button>
      </template>
    </b-table>
    <b-row>
      <b-col md="auto">
        <b-pagination v-model="currentPage" :total-rows="transactions.length"/>
      </b-col>
      <b-col md="auto">
        <b-form-select :options="[10,15,20,50,100]" v-model="perPage" />
      </b-col>
    </b-row>
    <b-modal v-model="showEditModal" hide-header hide-footer>
      <pet-transaction-form :editId="editTransactionId" :on_cancel="cancelButtonClicked"/>
    </b-modal>
  </b-container>
</template>
<script>
import TransactionForm from './TransactionForm.vue'

export default {
  name: 'pet-transaction-table',
  components: {
    'pet-transaction-form': TransactionForm
  },
  data () {
    return {
      fields: [
        { key: 'checkbox', label: '' },
        { key: 'date', sortable: true },
        { key: 'accountId', label: 'Account', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'brief_desc', label: 'Brief Desc', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 0,
      perPage: 10,
      showEditModal: false,
      editTransactionId: null,
      filter: null
    }
  },
  methods: {
    cancelButtonClicked () {
      this.showEditModal = false
    },
    editButtonClicked (id) {
      this.editTransactionId = id
      this.showEditModal = true
    },
    sortTable (a, b, key) {
      if (key === 'brief_desc') {
        return a.description.localeCompare(b.description)
      }
    }
  },
  computed: {
    transactions () {
      return this.$store.state.Transactions.transactions
    }
  },
  created () {
    this.$store.dispatch('refreshTransactions')
  }
}
</script>

<style lang="scss">
  .custom-select {
    background: #fff;
  }
</style>
