<template>
  <b-form @submit="addCategory">
    <!-- Category Name -->
    <b-form-group label="Category Name">
      <b-input id="category_name" required v-model="add_form.category_name"/>
    </b-form-group>
    <b-form-group label="Keywords">
      <b-input id="category_keywords" v-model="add_form.category_keywords"/>
    </b-form-group>
    <b-button type="submit" variant="primary" class="text-light">Submit</b-button>
  </b-form>
</template>
<script>
import controllers from '../../data/controllers'

export default {
  name: 'pet-category-add-form',
  data () {
    return {
      add_form: {
        category_name: '',
        category_keywords: ''
      }
    }
  },
  methods: {
    addCategory (evt) {
      evt.preventDefault()
      controllers.categories.addCategory({
        name: this.add_form.category_name,
        match_words: this.add_form.category_keywords
      }).then(async () => {
        await this.$store.dispatch('refreshCategories')
        this.add_form = {
          category_name: '',
          category_keywords: ''
        }
      })
    }
  }
}
</script>
