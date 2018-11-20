let db = require('../index').db

let methods = {}

methods.addCategory = (category) => {
  return db.categories.put(category)
}
methods.getAllCategories = () => {
  return db.categories.toArray()
}
methods.getDefaultCategory = () => {
  return db.categories.first()
}
export default methods
