import controllers from '../../data/controllers'
import mutators from '../mutators'

const state = {
  imported_transactions: [],
  isRefreshing: false
}

const mutations = {
  [mutators.IMPORTTRANS_SET_TRANSACTIONS] (state, data) {
    state.imported_transactions = data
  },
  [mutators.IMPORTTRANS_SET_ISREFRESHING] (state, data) {
    state.isRefreshing = data
  }
}

const actions = {
  refreshImportedTransactions ({ commit }) {
    commit(mutators.IMPORTTRANS_SET_ISREFRESHING, true)
    return controllers.imported_transaction.getAllTransactions().then((data) => {
      commit(mutators.IMPORTTRANS_SET_TRANSACTIONS, data)
      commit(mutators.IMPORTTRANS_SET_ISREFRESHING, false)
    })
  },
  setIsRefreshing ({ commit }, payload) {
    commit(mutators.IMPORTTRANS_SET_ISREFRESHING, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
