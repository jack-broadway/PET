<template>
  <b-container fluid>
    <h1>Categories</h1>
    <b-row>
      <b-col>
        <pet-category-list/>
      </b-col>
      <b-col>
        <pet-category-add-form/>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import CategoryAddForm from './Categories/AddCategoryForm.vue'
import CategoryList from './Categories/CategoryList.vue'

export default {
  name: 'pet-categories',
  components: {
    'pet-category-add-form': CategoryAddForm,
    'pet-category-list': CategoryList
  }
}
</script>
<style lang="scss">

</style>

