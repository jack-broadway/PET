<template>
  <b-container fluid>
    <pet-categorize-transaction-table/>
  </b-container>
</template>

<script>
import CategorizeTransactionTable from './Transactions/CategorizeTransactionTable.vue'

export default {
  components: {
    'pet-categorize-transaction-table': CategorizeTransactionTable
  }
}
</script>
<style lang="scss">

</style>
