import Vue from 'vue'
import router from '../../router/index.js'

const ws = new WebSocket('ws://185.200.241.231:81/client')
Vue.prototype.$ws = ws

function isAuth(data) {
  if (data.used) {
    if (data.used[0]) {
      if (data.used[0].complete) {
        console.log('Auth with WS COMPLETED')
        return true
      } else if (data.used[0].reason) {
        console.log('Auth with ws ended with ERROR', data.used[0].reason)
        return false
      }
    }
  }
}

export default function socketPlugin() {
  return (store) => {
    /*console.log(store)*/
    ws.onopen = function (event) {
      console.log('содинение установлено')
      store.commit('appData/SET_WS_STATE', true)
      ws.send(
        JSON.stringify({
          event: 'authorize',
          token: store.getters['appData/getToken'],
        })
      )
    }

    ws.onmessage = async function (event) {
      const data = JSON.parse(await event.data.text())
      console.log('сообщение от сервера получено', data)

      if (data.event === 'authorize' || data.event === 'authorize error') {
        if (isAuth(data)) {
          store.commit('appData/SET_WS_IS_AUTH', true)
        } else {
          store.commit('appData/SET_WS_IS_AUTH', false)

          store.dispatch('appData/logoutAction')
          await router
            .push({
              path: '/login',
            })
            .catch(() => {})
        }
      }

      if (data.event === 'query') {
        const queryData = {
          ...data,
          used: [JSON.parse(data.used[0])],
        }

        if (queryData.used[0].label === 'getAllUsers') {
          store.dispatch('users/setAllUsers', queryData.used[0].receivedData)
        }

        if (queryData.used[0].label === 'getAllReports') {
          store.dispatch('reportslist/setAll', queryData.used[0].receivedData)
        }

        if (queryData.used[0].label === 'getAllTasks') {
          store.dispatch('tasks/setAllTasks', queryData.used[0].receivedData)
        }

        if (queryData.used[0].label === 'getAllTaskList') {
          store.dispatch('taskList/setAll', queryData.used[0].receivedData)
        }

        if (queryData.used[0].label === 'getAllMatches') {
          store.dispatch('matchList/setAll', queryData.used[0].receivedData)
        }

        if (queryData.used[0].label === 'getAllOrders') {
          store.dispatch('orderList/setAll', queryData.used[0].receivedData)
        }

        if (queryData.used[0].label === 'updateUsers') {
          store.dispatch('users/getAllUsers')
        }

        if (queryData.used[0].label === 'updateTasks') {
          store.dispatch('tasks/getAllTasks')
        }

        if (queryData.used[0].label === 'updateMatch') {
          store.dispatch('matchList/getAll')
        }

        if (queryData.used[0].label === 'getMatchesCount') {
          store.commit('users/SET_MATCHES_COUNT', queryData.used[0].receivedData)
        }

        console.log(queryData)
      }
      if (data.event === 'syscall') {
        const queryData = {
          ...data,
          used: [JSON.parse(data.used[0])],
        }
        queryData.used[0].callResult = JSON.stringify(queryData.used[0].callResult)

        if (queryData.used[0].label === 'updateMatch') {
          store.dispatch('matchList/getAll')
        }
        console.log(queryData)
      }
    }
    ws.onerror = function (event) {
      store.commit('appData/SET_WS_IS_AUTH', false)
      console.log('Ошибка WebSocket')
      console.log(event)
      ws.close()
    }

    ws.onclose = function (event) {
      console.log('Закрыто соединение c WebSockets')
      store.commit('appData/SET_WS_STATE', false)
    }
  }
}
