<template>
  <b-container fluid>
    <b-tabs pills nav-class="nav-tab-header">
      <b-tab title="Transactions" active>
        <pet-transaction-table/>
      </b-tab>
      <b-tab title="Imported Transactions">
        <pet-categorize-transaction-table/>
      </b-tab>
    </b-tabs>
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
  .nav-tab-header {
    display: flex;
    justify-content: center;
  }
</style>
