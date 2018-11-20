<template>
  <b-container fluid>
    <b-card no-body class="mt-3">
      <b-btn block v-b-toggle.cat_trans_drop variant="secondary">Transactions to be Categorized</b-btn>
      <b-collapse id="cat_trans_drop" visible role="tabpanel">
        <b-card-body>
          <pet-categorize-transaction-table/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="my-3">
      <b-btn block v-b-toggle.trans_drop variant="secondary">Transactions</b-btn>
      <b-collapse id="trans_drop" visible role="tabpanel">
        <b-card-body class="mb-3">
          <pet-transaction-table/>
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import CategorizeTransactionTable from './Transactions/CategorizeTransactionTable.vue'
import TransactionTable from './Transactions/TransactionsTable.vue'

export default {
  components: {
    'pet-categorize-transaction-table': CategorizeTransactionTable,
    'pet-transaction-table': TransactionTable
  }
}
</script>
<style lang="scss">

</style>
