<template>
  <b-card header="Categories">
    <b-card-body>
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center"
          v-for="category in categories" :key="category.id">
          {{ category.name }}
          <b-button variant="primary" class="text-light">Edit</b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  name: 'pet-category-list',
  computed: {
    categories () {
      return this.$store.state.Categories.categories
    }
  },
  created () {
    this.$store.dispatch('refreshCategories')
  }
}
</script>
