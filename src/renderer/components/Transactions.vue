<template>
  <b-container fluid>
    <pet-transaction-table/>
  </b-container>
</template>

<script>
import TransactionTable from './Transactions/TransactionsTable.vue'

export default {
  components: {
    'pet-transaction-table': TransactionTable
  }
}
</script>
