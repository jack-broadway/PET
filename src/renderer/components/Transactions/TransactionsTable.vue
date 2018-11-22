<template>
  <b-container fluid class="mt-2">
    <b-row>
      <b-col md="auto">
        <b-pagination v-model="currentPage" :total-rows="transactions.length"/>
      </b-col>
      <b-col md="auto">
        <b-form-select :options="[10,15,20,50,100]" v-model="perPage" />
      </b-col>
    </b-row>  
    <b-table show-empty striped class="mt-2" 
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
        <b-button size="sm" variant="primary" class="text-light">Edit</b-button>
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
  </b-container>
</template>
<script>
export default {
  name: 'pet-transaction-table',
  data () {
    return {
      fields: [
        { key: 'checkbox', label: '' },
        { key: 'date', sortable: true },
        { key: 'accountId', label: 'Account', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'brief_desc', label: 'Brief Desc' },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 0,
      perPage: 10
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
