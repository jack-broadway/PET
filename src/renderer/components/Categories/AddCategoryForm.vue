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
    <b-button v-if="on_cancel" @click="on_cancel" variant="secondary" class="ml-3">Cancel</b-button>
  </b-form>
</template>
<script>
import controllers from '../../data/controllers'

export default {
  name: 'pet-category-add-form',
  props: ['editId', 'on_cancel'],
  watch: {
    async editId (newVal, oldVal) {
      if (newVal === oldVal) return
      let category = await controllers.categories.getCategoryById(newVal)
      this.add_form.category_name = category.name
      this.add_form.category_keywords = category.match_words
    }
  },
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
      if (!this.editId) {
        console.log('Adding New')
        // Add new category
        controllers.categories.addCategory({
          name: this.add_form.category_name,
          match_words: this.add_form.category_keywords
        }).then(async () => {
          await this.$store.dispatch('refreshCategories')
          this.add_form = {
            category_name: '',
            category_keywords: ''
          }
          if (this.on_cancel) return this.on_cancel()
        })
      } else {
        // Update Existing
        console.log('Updating Existing')
        controllers.categories.updateCategoryById(this.editId, {
          name: this.add_form.category_name,
          match_words: this.add_form.category_keywords
        }).then(() => {
          this.$store.dispatch('refreshCategories')
          if (this.on_cancel) return this.on_cancel()
        })
      }
    }
  }
}
</script>
