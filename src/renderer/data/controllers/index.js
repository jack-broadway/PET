const files = require.context('.', false, /\.js$/)
const controllers = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  controllers[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default controllers
