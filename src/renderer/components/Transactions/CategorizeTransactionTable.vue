<template>
  <b-container fluid class="mt-2">
    <b-row>
      <b-col sm="auto">
        <b-pagination v-model="currentPage" :total-rows="imported_transactions.length"/>
      </b-col>
      <b-col sm="auto">
        <b-form-select :options="[10,15,20,50,100]" v-model="perPage" />
      </b-col>
      <b-col sm="auto">
        <b-form-input v-model="filter" placeholder="Type to Search" />
      </b-col>
      <b-col md="auto" class="ml-auto my-1 ">
        <div class="float-right">
          <b-button variant="dark" class="mr-1" @click.prevent="categorizeTransactions">Auto Categorize</b-button>
          <b-button variant="dark" class="mr-1" @click.prevent="finaliseSelectedTransactions">Finalise ({{ checked_transactions.length }})</b-button>
          <b-dropdown right :text="`Actions (${checked_transactions.length })`" variant="primary">
            <b-dropdown-item >Merge Transactions</b-dropdown-item>
            <b-dropdown-item @click.prevent="deleteSelectedTransactions">Delete</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>  
    <b-table show-empty striped class="mt-2" 
      :items="imported_transactions" :fields="fields" :sort-compare="sortCompare"
      :per-page="perPage" :current-page="currentPage" :filter="filter">
      <template slot="HEAD_checkbox" slot-scope="row">
        <b-form-checkbox @click.native.stop @change="toggleAllSelected" v-model="allChecked[currentPage]"
          class="table-header-checkbox"/>
      </template>
      <template slot="checkbox" slot-scope="row">
        <b-form-checkbox @click.native.stop :key="row.index" :value="row.item.id"
          v-model="checked_transactions" class="table-row-checkbox"/>
      </template>
      <template slot="amount" slot-scope="row">
        {{ row.item.debit || row.item.credit }}
      </template>
      <template slot="brief_desc" slot-scope="row">
        {{ (row.item.description).substring(0,20) }}
      </template>
      <template slot="category" slot-scope="row">
        <b-form-select v-model="categorized_transactions[row.item.id]">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </b-form-select>
      </template>
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button size="sm" variant="primary" class="text-light" @click="editButtonClicked(row.item.id)">Edit</b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          {{ row.item.description }}
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col sm="auto">
        <b-pagination v-model="currentPage" :total-rows="imported_transactions.length"/>
      </b-col>
      <b-col sm="auto">
        <b-form-select :options="[10,15,20,50,100]" v-model="perPage" />
      </b-col>
    </b-row>
    <b-modal v-model="showEditModal" hide-header hide-footer>
      <pet-transaction-form :editId="editTransactionId" :on_cancel="cancelButtonClicked" is-imported/>
    </b-modal>
  </b-container>
</template>
<script>
/* eslint no-labels: ["error", { "allowLoop": true }] */
import controllers from '../../data/controllers'
import TransactionForm from './TransactionForm.vue'

export default {
  name: 'pet-categorize-transaction-table',
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
        { key: 'brief_desc', label: 'Brief Desc' },
        { key: 'category', label: 'Category' },
        { key: 'actions', label: 'Actions' }
      ],
      categorized_transactions: {},
      checked_transactions: [],
      allChecked: [],
      imported_transactions: [],
      showEditModal: false,
      editTransactionId: null,
      currentPage: 0,
      perPage: 10,
      filter: null
    }
  },
  computed: {
    categories () {
      return this.$store.getters.sortedCategories
    }
  },
  methods: {
    editButtonClicked (id) {
      this.editTransactionId = id
      this.showEditModal = true
    },
    cancelButtonClicked () {
      this.showEditModal = false
    },
    async finaliseSelectedTransactions () {
      this.allChecked = []
      let transactions = []
      for (let index in this.checked_transactions) {
        let transId = this.checked_transactions[index]
        let tempTrans = await controllers.imported_transaction.getTransactionById(transId)
        tempTrans.categoryId = this.categorized_transactions[transId]
        transactions.push(tempTrans)
      }
      for (let index in transactions) {
        await controllers.transaction.addTransaction(transactions[index])
      }
      await this.deleteSelectedTransactions()
      this.$store.dispatch('refreshImportedTransactions')
      this.$store.dispatch('refreshTransactions')
    },
    async deleteSelectedTransactions () {
      this.allChecked = []
      for (let transactionId in this.checked_transactions) {
        await controllers.imported_transaction.deleteTransactionById(this.checked_transactions[transactionId])
      }
      this.$store.dispatch('refreshImportedTransactions')
      this.checked_transactions = []
    },
    sortCompare (a, b, key) {
      if (key === 'amount') {
        let aAmt = parseFloat(a.credit || a.debit)
        let bAmt = parseFloat(b.credit || b.debit)
        if (aAmt > bAmt) {
          return 1
        } else if (aAmt === bAmt) {
          return 0
        } else {
          return -1
        }
      }
      if (key === 'brief_desc') {
        return a.description.localeCompare(b.description)
      }
      return null
    },
    toggleAllSelected (checked) {
      let startingItem = (this.currentPage - 1) * this.perPage
      let checkedItems = this.checked_transactions
      for (let rowNumber = startingItem; rowNumber < startingItem + this.perPage; rowNumber++) {
        let currentTransactionId = this.imported_transactions[rowNumber].id
        if (checked) {
          checkedItems.push(currentTransactionId)
        } else {
          checkedItems = checkedItems.filter(item => item !== currentTransactionId)
        }
      }
      this.checked_transactions = checkedItems
    },
    categorizeTransactions: async function () {
      console.log('Categorizing Transactions')
      let defaultCategory = await controllers.categories.getDefaultCategory()
      // Loop through all too be categorized transactions
      transLoop:
      for (let transIndex in this.imported_transactions) {
        let currentTransaction = this.imported_transactions[transIndex]
        // Loop through each category available
        for (let catIndex in this.categories) {
          let currentCategory = this.categories[catIndex]
          if (!currentCategory.match_words) {
            continue
          }
          let matchWords = currentCategory.match_words.split(',')
          // Loop through each matching term for that category
          for (let matchWordIndex in matchWords) {
            // Create a regex string out of the match string, and sanitize it
            let testRegex = new RegExp(`(${matchWords[matchWordIndex].replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi')
            if (testRegex.test(currentTransaction.description)) {
              this.$set(this.categorized_transactions, currentTransaction.id, currentCategory.id)
              continue transLoop
            }
          }
        }
        this.$set(this.categorized_transactions, currentTransaction.id, defaultCategory.id)
      }
      console.log('Finished Categorizing')
    }
  },
  async created () {
    this.$store.dispatch('refreshCategories')
    this.imported_transactions = await controllers.imported_transaction.getAllTransactions()
  }
}
</script>

<style lang="scss">
  .custom-select {
    background: #fff;
  }
</style>
