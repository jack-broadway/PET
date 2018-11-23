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
  async refreshAvailableAccounts ({ state, commit }) {
    let importedAccounts = await controllers.imported_transaction.getAccountsFromTransactions()
    let transactionAccounts = await controllers.transaction.getAccountsFromTransactions()

    let unAddedAccounts = [...new Set(importedAccounts.concat(transactionAccounts))]
    let existingAccounts = state.accounts.map(x => x.accountId)
    let foundAccounts = []
    console.log(unAddedAccounts)

    for (let account in unAddedAccounts) {
      if (existingAccounts.includes(unAddedAccounts[account])) {
        continue
      }
      foundAccounts.push(unAddedAccounts[account])
    }
    commit(mutators.ACCOUNTS_SET_IMPORTED_ACCOUNTS, foundAccounts)
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
