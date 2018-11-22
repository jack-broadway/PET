<template>
  <div>
    <b-card header="Categories">
      <b-card-body>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center"
            v-for="category in categories" :key="category.id">
            {{ category.name }}
            <div>
              <b-button variant="primary" class="text-light" @click.stop="editButtonClicked(category.id)">Edit</b-button>
              <b-button variant="danger" class="text-light" @click.stop="deleteButtonClicked(category.id)">Delete</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card-body>
    </b-card>
    <b-modal v-model="showEditModal" hide-header hide-footer>
      <pet-category-add-form :editId="editCategoryId" :on_cancel="cancelButtonClicked"/>
    </b-modal>
  </div>
</template>
<script>
import controllers from '../../data/controllers'

import CategoryAddForm from './AddCategoryForm.vue'

export default {
  name: 'pet-category-list',
  components: {
    'pet-category-add-form': CategoryAddForm
  },
  data () {
    return {
      editCategoryId: null,
      showEditModal: false
    }
  },
  computed: {
    categories () {
      return this.$store.state.Categories.categories
    }
  },
  methods: {
    editButtonClicked (categoryId) {
      this.editCategoryId = categoryId
      this.showEditModal = true
    },
    async deleteButtonClicked (categoryId) {
      console.log(`Deleting: ${categoryId}`)
      await controllers.categories.deleteCategoryById(categoryId)
      this.$store.dispatch('refreshCategories')
    },
    cancelButtonClicked () {
      this.showEditModal = false
    }
  },
  created () {
    this.$store.dispatch('refreshCategories')
  }
}
</script>
