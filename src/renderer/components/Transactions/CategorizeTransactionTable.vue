<template>
  <b-container fluid class="mt-2">
    <b-row>
      <b-col md="auto">
        <h2>Categorize Transactions</h2>
      </b-col>
      <b-col md="auto" class="ml-auto my-1 ">
        <div class="float-right">
          <b-button  variant="dark" class="mr-1">Finalise ({{ checked_transactions.length }})</b-button>
          <b-dropdown right :text="`Actions (${checked_transactions.length })`" variant="primary">
            <b-dropdown-item >Merge Transactions</b-dropdown-item>
            <b-dropdown-item @click.prevent="deleteSelected">Delete</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>  
    <b-table show-empty striped class="mt-2" 
      :items="imported_transactions" :fields="fields" :sort-compare="sortCompare"
      per-page=20 :current-page="currentPage">
      <template slot="HEAD_checkbox" slot-scope="row">
        <b-form-checkbox @click.native.stop @change="toggleAllSelected" v-model="allSelected" 
          class="table-header-checkbox"/>
      </template>
      <template slot="checkbox" slot-scope="row">
        <b-form-checkbox @click.native.stop  :key="row.item.id" :value="row.item.id" 
          v-model="checked_transactions" class="table-row-checkbox"/>
      </template>
      <template slot="amount" slot-scope="row">
        {{ row.item.debit || row.item.credit }}
      </template>
      <template slot="brief_desc" slot-scope="row">
        {{ (row.item.description).substring(0,20) }}
      </template>
      <template slot="category" slot-scope="row">
        <b-form-select :options="categories"/>
      </template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          {{ row.item.description }}
        </b-card>
      </template>
      <template slot="empty" v-if="!loading_data">
        <b-jumbotron header="No Transactions to Categorize" lead="Try importing some more through settings"/>
      </template>
    </b-table>
    <b-row>
      <b-col md="auto">
        <b-pagination v-model="currentPage" :total-rows="imported_transactions.length"/>
      </b-col>
      <b-col md="auto" class="ml-auto my-1 ">
      </b-col>
    </b-row> 
  </b-container>
</template>
<script>
export default {
  name: 'pet-categorize-transaction-table',
  data () {
    return {
      fields: [
        { key: 'checkbox', label: '' },
        { key: 'date', sortable: true },
        { key: 'account', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'brief_desc', label: 'Brief Desc' },
        { key: 'category', label: 'Category' },
        { key: 'actions', label: 'Actions' }
      ],
      categories: [
        { value: 'fuel', text: 'Fuel' }
      ],
      currentPage: 0
    }
  },
  computed: {
    imported_transactions () {
      return this.$store.state.ImportedTransactions.imported_transactions
    },
    checked_transactions: {
      set (checkedArray) {
        return this.$store.dispatch('setCheckedImportedTransaction', checkedArray)
      },
      get () {
        return this.$store.state.ImportedTransactions.checked_transactions
      }
    },
    allSelected: {
      set (allSelectedState) {
        return this.$store.dispatch('setAllChecked', allSelectedState)
      },
      get () {
        return this.$store.state.ImportedTransactions.allSelected
      }
    },
    loading_data: {
      set (isRefreshingState) {
        return this.$store.dispatch('setIsRefreshing', isRefreshingState)
      },
      get () {
        return this.$store.state.ImportedTransactions.isRefreshing
      }
    }
  },
  methods: {
    /* eslint-disable */
    sortCompare (a, b, key) {
      if (key === 'amount') {
        let a_amt = parseFloat(a.credit || a.debit)
        let b_amt = parseFloat(b.credit || b.debit)
        if(a_amt > b_amt){
          return 1
        } else if (a_amt === b_amt){
          return 0
        } else {
          return -1
        }
      } else {
        return null
      }
    },
    toggleAllSelected(checked){
      this.checked_transactions = checked ? this.imported_transactions.map(transaction => transaction.id) : []
    },
    deleteSelected: async function() {
      this.$store.dispatch('deleteSelectedTransactions')
    }
  },
  mounted () {
    this.$store.dispatch('refreshImportedTransactions')
  }
}
</script>

<style lang="scss">
  .custom-select {
    background: #fff;
  }
</style>
