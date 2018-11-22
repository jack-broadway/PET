<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <pet-category-list/>
      </b-col>
      <b-col>
        <b-card header="Add Category">
          <b-card-body>
            <pet-category-add-form/>
          </b-card-body>
        </b-card>
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

