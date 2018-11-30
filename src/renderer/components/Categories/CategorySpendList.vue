<template>
  <b-list-group>
    <b-list-group-item class="d-flex justify-content-between align-items-center"
      v-for="spending in category_spends" :key="spending.name">
      {{ spending.category.name }} : <span>${{ (spending.debit + spending.credit) / 100 }}</span>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  name: 'pet-category-spendlist',
  props: ['category_spends']
}
</script>