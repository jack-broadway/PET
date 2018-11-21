import fastcsv from 'fast-csv'
import fs from 'fs'

let db = require('../index').db

let methods = {}

methods.importFile = (filepath, headers) => {
  return new Promise((resolve, reject) => {
    let csvStream = fs.createReadStream(filepath)

    let csvReader = fastcsv.fromStream(csvStream, {renameHeaders: true, headers: headers})
    csvReader.on('data', async (data) => {
      await methods.addTransaction(data)
    })
    csvReader.on('error', reject)
    csvReader.on('end', resolve)
  })
}
methods.addTransaction = (transaction) => {
  return db.imported_transactions.put(transaction)
}
methods.deleteTransaction = (id) => {
  return db.imported_transactions.where('id').equals(id).delete()
}
methods.deleteAllTransactions = () => {
  return db.imported_transactions.clear()
}
methods.getAllTransactions = () => {
  return db.imported_transactions.toArray()
}
methods.getTransactionById = (id) => {
  return db.imported_transactions.get(id)
}
methods.getAccountsFromTransactions = async () => {
  return db.imported_transactions.orderBy('accountId').uniqueKeys()
}

export default methods
