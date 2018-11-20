let db = require('../index').db

let methods = {}

methods.addTransaction = (transaction) => {
  return db.transactions.put(transaction)
}
methods.getAllTransactions = async () => {
  const allTransactions = await db.transactions.toArray()

  await allTransactions.map(async transaction => {
    transaction.category = (await db.categories.get(transaction.categoryId).catch(() => { return {name: 'Null'} })).name
  })

  return allTransactions
}

export default methods
