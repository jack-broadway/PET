import Dexie from 'dexie'
import 'dexie-export-import'

export const db = new Dexie('PET-DB')

db.version(1).stores({
  imported_transactions: 'id++, accountId',
  transactions: 'id++, accountId, categoryId, date',
  accounts: 'accountId',
  categories: 'id++, default'
})

db.categories.count().then(count => {
  if (count === 0) {
    db.categories.put({
      name: 'Uncategorized',
      default: 1
    })
  }
})

export default {
  db: db
}
