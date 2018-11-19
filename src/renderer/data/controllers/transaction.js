let db = require('../index').db

let methods = {}

methods.addTransaction = (transaction) => {
  return db.transactions.put(transaction)
}
methods.getAllTransactions = () => {
  return db.transactions.toArray()
}
