let db = require('../index').db

let methods = {}

methods.addTransaction = (transaction) => {
  return db.transactions.put(transaction)
}
methods.getTransactionById = (id) => {
  return db.transactions.get(id)
}
methods.getAllTransactions = async () => {
  const allTransactions = await db.transactions.toArray()

  await Promise.all(allTransactions.map(async transaction => {
    transaction.category = (await db.categories.get(transaction.categoryId).catch(() => { return {name: 'Null'} })).name
  }))
  return allTransactions
}
methods.getAccountsFromTransactions = async () => {
  return db.transactions.orderBy('accountId').uniqueKeys()
}

export default methods
