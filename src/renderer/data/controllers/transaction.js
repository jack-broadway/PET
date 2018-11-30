let db = require('../index').db

let methods = {}

methods.addTransaction = (transaction) => {
  return db.transactions.put(transaction)
}
methods.getTransactionById = (id) => {
  return db.transactions.get(id)
}
methods.updateTransactionById = (id, update) => {
  return db.transactions.update(id, update)
}
methods.getAllTransactions = async () => {
  const allTransactions = await db.transactions.toArray()

  await Promise.all(allTransactions.map(async transaction => {
    transaction.category = (await db.categories.get(transaction.categoryId).catch(() => { return {name: 'Null'} })).name
  }))
  return allTransactions
}
methods.getTransactionsInRange = async (startDate, endDate) => {
  return db.transactions.where('date').between(startDate, endDate).toArray()
}
methods.getAccountsFromTransactions = async () => {
  return db.transactions.orderBy('accountId').uniqueKeys()
}

export default methods
