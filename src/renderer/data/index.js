import Dexie from 'dexie'

export const db = new Dexie('PET-DB')

db.version(1).stores({
  imported_transactions: 'id++, accountId',
  transactions: 'id++, accountId, categoryId',
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
