import createPersistedState from 'vuex-persistedstate'

// {store} 相当于 nuxt
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'login_user_info'
    })(store)
  })
}