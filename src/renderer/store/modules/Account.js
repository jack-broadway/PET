import controllers from '../../data/controllers'
import mutators from '../mutators'

const state = {
  accounts: [],
  imported_accounts: []
}

const mutations = {
  [mutators.ACCOUNTS_SET_ACCOUNTS] (state, data) {
    state.accounts = data
  },
  [mutators.ACCOUNTS_SET_IMPORTED_ACCOUNTS] (state, data) {
    state.imported_accounts = data
  }
}

const actions = {
  refreshAccountData ({ commit }) {
    return controllers.account.getAllAccounts().then((data) => {
      commit(mutators.ACCOUNTS_SET_ACCOUNTS, data)
    })
  },
  refreshImportedAccounts ({ state, commit }) {
    return controllers.imported_transaction.getAccountsFromTransactions().then((data) => {
      let existingAccounts = state.accounts.map(x => x.account)
      let foundAccounts = []
      for (let account in data) {
        if (existingAccounts.includes(data[account])) {
          continue
        }
        foundAccounts.push(data[account])
      }
      commit(mutators.ACCOUNTS_SET_IMPORTED_ACCOUNTS, foundAccounts)
    })
  },
  addAccount ({ dispatch }, payload) {
    return controllers.account.addAccount(payload).then(() => {
      dispatch('refreshAccountData')
      dispatch('refreshImportedAccounts')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
