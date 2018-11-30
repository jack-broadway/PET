import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/overview'
    },
    {
      path: '/overview',
      name: 'overview',
      component: require('@/components/Index').default
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: require('@/components/Transactions').default
    },
    {
      path: '/imported_transactions',
      name: 'imported_transactions',
      component: require('@/components/ImportedTransactions').default
    }
  ]
})
