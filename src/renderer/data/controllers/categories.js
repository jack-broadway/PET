let db = require('../index').db

let methods = {}

methods.addCategory = (category) => {
  return db.categories.put(category)
}
methods.getCategoryById = (id) => {
  return db.categories.get(id)
}
methods.deleteCategoryById = (id) => {
  return db.categories.where('id').equals(id).delete().then(async () => {
    let defaultCategory = (await methods.getDefaultCategory()).id
    return db.transactions.where('categoryId').equals(id).modify({
      categoryId: defaultCategory
    })
  })
}
methods.updateCategoryById = (id, update) => {
  return db.categories.update(id, update)
}
methods.getAllCategories = () => {
  return db.categories.toArray()
}
methods.getDefaultCategory = () => {
  return db.categories.where('default').equals(1).first()
}

export default methods
