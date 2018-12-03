<template>
  <b-list-group>
    <b-list-group-item class="d-flex justify-content-between align-items-center"
      v-for="spending in activeSpending" :key="spending.name">
      {{ spending.category.name }} : <span class="mono-font">{{ $currencyFormatter.format((spending.debit + spending.credit) / 100) }}</span>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  name: 'pet-category-spendlist',
  props: ['category_spends'],
  computed: {
    activeSpending () {
      let activeSpendingCategories = []
      // Only show categories that have credit or debit
      for (let spend in this.category_spends) {
        let spending = this.category_spends[spend]
        if ((spending.debit + spending.credit) !== 0) {
          activeSpendingCategories.push(spending)
        }
      }
      // Sort asc by spending amount
      activeSpendingCategories.sort((a, b) => (a.debit + a.credit) - (b.debit + b.credit))
      return activeSpendingCategories
    }
  }
}
</script>