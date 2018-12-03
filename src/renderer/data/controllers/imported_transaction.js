import fastcsv from 'fast-csv'
import fs from 'fs'
import moment from 'moment'

let db = require('../index').db

let methods = {}

methods.importFile = (filepath, config) => {
  return new Promise((resolve, reject) => {
    let csvStream = fs.createReadStream(filepath)

    let csvReader = fastcsv.fromStream(csvStream, {renameHeaders: true, headers: config.headers})
    csvReader.on('data', async (data) => {
      data.date = moment(data.date, config.date_format).format('YYYY-MM-DD')
      await methods.addTransaction(data)
    })
    csvReader.on('error', reject)
    csvReader.on('end', resolve)
  })
}
methods.addTransaction = (transaction) => {
  return db.imported_transactions.put(transaction)
}
methods.deleteTransactionById = (id) => {
  return db.imported_transactions.where('id').equals(id).delete()
}
methods.updateTransactionById = (id, update) => {
  return db.imported_transactions.update(id, update)
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
