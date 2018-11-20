let db = require('../index').db

let methods = {}

methods.addAccount = (accounts) => {
  return db.accounts.put(accounts)
}
methods.getAllAccounts = () => {
  return db.accounts.toArray()
}

export default methods
