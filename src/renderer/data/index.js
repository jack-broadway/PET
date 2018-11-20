import Dexie from 'dexie'

export const db = new Dexie('PET-DB')

db.version(1).stores({
  imported_transactions: 'id++, account',
  transactions: 'id++, categoryId',
  accounts: 'accountId',
  categories: 'id++'
})

db.categories.count().then(count => {
  if (count === 0) {
    db.categories.put({
      name: 'Uncategorized'
    })
  }
})

export default {
  db: db
}
