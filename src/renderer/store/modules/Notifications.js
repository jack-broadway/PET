import mutators from '../mutators'

const state = {
  notifications: []
}

const mutations = {
  [mutators.NOTIFICATIONS_SET_NOTIFICATIONS] (state, data) {
    state.notifications = data
  },
  [mutators.NOTIFICATIONS_ADD_NOTIFICATION] (state, notification) {
    state.notifications.push(notification)
  }
}

const actions = {
  addNotification ({ commit }, notification) {
    commit(mutators.NOTIFICATIONS_ADD_NOTIFICATION, notification)
  },
  removeNotification ({ commit, state }, notificationId) {
    let tempNotifications = state.notifications.filter(notification => notification.id !== notificationId)
    commit(mutators.NOTIFICATIONS_SET_NOTIFICATIONS, tempNotifications)
  }
}

export default {
  state,
  mutations,
  actions
}
