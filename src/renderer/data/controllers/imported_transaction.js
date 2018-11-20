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
  return db.imported_transactions.orderBy('account').uniqueKeys()
}
methods.getTransactionStatistics = async () => {
  let transactions = await methods.getAllTransactions()
  let totalCredit = 0
  let totalDebit = 0

  transactions.forEach((transaction) => {
    totalCredit += isNaN(parseFloat(transaction['credit'])) ? 0 : parseInt(parseFloat(transaction['credit']) * 100)
    totalDebit += isNaN(parseFloat(transaction['debit'])) ? 0 : parseInt(parseFloat(transaction['debit']) * 100)
  })

  return { totalCredit: totalCredit / 100, totalDebit: totalDebit / 100, balance: (totalCredit + totalDebit) / 100 }
}
export default methods
