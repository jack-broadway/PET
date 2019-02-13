import controllers from '../../data/controllers'
import mutators from '../mutators'

const state = {
  categories: []
}

const mutations = {
  [mutators.CATEGORIES_SET_CATEGORIES] (state, data) {
    state.categories = data
  }
}

const actions = {
  refreshCategories ({ commit }) {
    return controllers.categories.getAllCategories().then((categories) => {
      commit(mutators.CATEGORIES_SET_CATEGORIES, categories)
    })
  }
}

const getters = {
  sortedCategories: state => {
    return state.categories.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
