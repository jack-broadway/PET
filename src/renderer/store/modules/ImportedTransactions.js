import controllers from '../../data/controllers'
import mutators from '../mutators'

const state = {
  imported_transactions: [],
  checked_transactions: [],
  allChecked: false,
  isRefreshing: false
}

const mutations = {
  [mutators.IMPORTTRANS_SET_TRANSACTIONS] (state, data) {
    state.imported_transactions = data
  },
  [mutators.IMPORTTRANS_SET_CHECKEDTRANSACTIONS] (state, data) {
    state.checked_transactions = data
  },
  [mutators.IMPORTTRANS_SET_ALLCHECKED] (state, data) {
    state.allChecked = data
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
  setCheckedImportedTransaction ({ commit }, payload) {
    commit(mutators.IMPORTTRANS_SET_CHECKEDTRANSACTIONS, payload)
  },
  setAllChecked ({ commit }, payload) {
    commit(mutators.IMPORTTRANS_SET_ALLCHECKED, payload)
  },
  setIsRefreshing ({ commit }, payload) {
    commit(mutators.IMPORTTRANS_SET_ISREFRESHING, payload)
  },
  async finaliseImportedTransactions ({ dispatch }, payload) {
    for (let index in payload) {
      await controllers.transaction.addTransaction(payload[index])
    }
    await dispatch('deleteSelectedTransactions')
    dispatch('refreshImportedTransactions')
    dispatch('refreshTransactions')
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
