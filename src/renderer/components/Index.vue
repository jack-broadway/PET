<template>
  <b-container fluid class="mt-3">
    <b-row>
      <b-col xl="4" >
        <pet-account-list class="mb-3"/>
        <pet-category-list class="mb-3"/>
      </b-col>
      <b-col xl="8">
        <pet-statistics-monthlyoverview class="mb-3"/>
      </b-col> 
    </b-row>
  </b-container>
</template>
<script>
import CategoryList from './Categories/CategoryList.vue'
import AccountList from './Accounts/AccountList.vue'
import MonthlyOverview from './Statistics/MonthlyOverview'

export default {
  name: 'index',
  components: {
    'pet-account-list': AccountList,
    'pet-category-list': CategoryList,
    'pet-statistics-monthlyoverview': MonthlyOverview
  }
}
</script>
