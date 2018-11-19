import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Index').default
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: require('@/components/Accounts').default
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: require('@/components/Transactions').default
    }
  ]
})
