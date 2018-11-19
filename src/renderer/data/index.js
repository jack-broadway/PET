import Dexie from 'dexie'

export const db = new Dexie('PET-DB')
db.version(1).stores({
  imported_transactions: 'id++, account',
  transactions: 'id++',
  accounts: 'account'
})

export default {
  db: db
}
