let db = require('../index').db

let methods = {}

methods.addAccount = (accounts) => {
  return db.accounts.put(accounts)
}
methods.getAccountById = (id) => {
  return db.accounts.get(id)
}
methods.getAllAccounts = async () => {
  let accounts = await db.accounts.toArray()
  for (let account in accounts) {
    let transStats = await methods.getTransactionStatsForAccount(accounts[account].accountId)
    accounts[account].balance = transStats.balance
  }
  return accounts
}
methods.updateAccountById = (id, update) => {
  return db.accounts.update(id, update)
}
methods.getTransactionStatsForAccount = async (accountId) => {
  let transactions = await db.transactions.where('accountId').equals(accountId).toArray()

  let totalCredit = 0
  let totalDebit = 0

  transactions.forEach((transaction) => {
    if (transaction['credit']) {
      totalCredit += parseInt(Math.round(parseFloat(transaction['credit']) * 100))
    } else {
      totalDebit += parseInt(Math.round(parseFloat(transaction['debit']) * 100))
    }
  })

  return { totalCredit: totalCredit / 100, totalDebit: totalDebit / 100, balance: (totalCredit + totalDebit) / 100 }
}

export default methods
