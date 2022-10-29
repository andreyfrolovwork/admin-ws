export default function localStoragePlugin() {
  return (store) => {
    console.log('localStoragePlugin.js')
    const userData = localStorage.getItem('userData')
    if (userData !== null) {
      store.commit('appData/SET_USER_FROM_LOCAL_STORAGE', JSON.parse(userData))
    }
  }
}
