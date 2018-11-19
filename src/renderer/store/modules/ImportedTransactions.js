import controllers from '../../data/controllers'

const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
const SET_CHECKEDTRANSACTIONS = 'SET_CHECKEDTRANSACTIONS'
const SET_ALLCHECKED = 'SET_ALLCHECKED'
const SET_ISREFRESHING = 'SET_ISREFRESHING'

const state = {
  imported_transactions: [],
  checked_transactions: [],
  allChecked: false,
  isRefreshing: false
}

const mutations = {
  [SET_TRANSACTIONS] (state, data) {
    state.imported_transactions = data
  },
  [SET_CHECKEDTRANSACTIONS] (state, data) {
    state.checked_transactions = data
  },
  [SET_ALLCHECKED] (state, data) {
    state.allChecked = data
  },
  [SET_ISREFRESHING] (state, data) {
    state.isRefreshing = data
  }
}

const actions = {
  refreshImportedTransactions ({ commit }) {
    commit(SET_ISREFRESHING, true)
    return controllers.imported_transaction.getAllTransactions().then((data) => {
      commit(SET_TRANSACTIONS, data)
      commit(SET_ISREFRESHING, false)
    })
  },
  setCheckedImportedTransaction ({ commit }, payload) {
    commit(SET_CHECKEDTRANSACTIONS, payload)
  },
  setAllChecked ({ commit }, payload) {
    commit(SET_ALLCHECKED, payload)
  },
  setIsRefreshing ({ commit }, payload) {
    commit(SET_ISREFRESHING, payload)
  },
  async deleteSelectedTransactions ({ state, dispatch }) {
    if (state.allChecked) {
      await controllers.imported_transaction.deleteAllTransactions()
    } else {
      for (let transactionId in state.checked_transactions) {
        await controllers.imported_transaction.deleteTransaction(state.checked_transactions[transactionId])
      }
    }
    dispatch('refreshImportedTransactions')
  }
}

export default {
  state,
  mutations,
  actions
}
