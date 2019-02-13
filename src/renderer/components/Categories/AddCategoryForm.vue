<template>
  <b-form @submit="addCategory">
    <!-- Category Name -->
    {{ add_form }}
    <b-form-group label="Category Name">
      <b-input id="category_name" required v-model="add_form.category_name"/>
    </b-form-group>
    <b-form-group label="Keywords">
      <b-input id="category_keywords" v-model="add_form.category_keywords"/>
    </b-form-group>
    <div class="mb-3">
      <b-form-checkbox v-model="add_form.category_exclude" :value="true">Exclude from calculations</b-form-checkbox>
    </div>
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
      if (newVal == null) {
        this.add_form = {
          category_name: '',
          category_keywords: '',
          category_exclude: '0'
        }
      } else {
        let category = await controllers.categories.getCategoryById(newVal)
        this.add_form.category_name = category.name
        this.add_form.category_keywords = category.match_words
        this.add_form.category_exclude = category.exclude
      }
    }
  },
  data () {
    return {
      add_form: {
        category_name: '',
        category_keywords: '',
        category_exclude: '0'
      }
    }
  },
  methods: {
    addCategory (evt) {
      evt.preventDefault()
      let updatedCategory = {
        name: this.add_form.category_name,
        match_words: this.add_form.category_keywords,
        exclude: this.add_form.category_exclude
      }
      if (!this.editId) {
        // Add new category
        controllers.categories.addCategory(updatedCategory).then(async () => {
          await this.$store.dispatch('refreshCategories')
        })
      } else {
        // Update Existing
        controllers.categories.updateCategoryById(this.editId, updatedCategory).then(async () => {
          await this.$store.dispatch('refreshCategories')
        })
      }
      this.add_form = {
        category_name: '',
        category_keywords: ''
      }
      this.editId = 'updated'
      if (this.on_cancel) return this.on_cancel()
    }
  }
}
</script>
