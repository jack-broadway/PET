import controllers from '../../data/controllers'
import mutators from '../mutators'

const state = {
  transactions: [],
  isRefreshing: false
}

const mutations = {
  [mutators.TRANSACTION_SET_TRANSACTIONS] (state, data) {
    state.transactions = data
  },
  [mutators.TRANSACTION_SET_ISREFRESHING] (state, data) {
    state.isRefreshing = data
  }
}

const actions = {
  refreshTransactions ({ commit }) {
    commit(mutators.TRANSACTION_SET_ISREFRESHING, true)
    return controllers.transaction.getAllTransactions().then((data) => {
      commit(mutators.TRANSACTION_SET_TRANSACTIONS, data)
      commit(mutators.TRANSACTION_SET_ISREFRESHING, false)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
