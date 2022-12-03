import jwt from 'jsonwebtoken'

export default {
  namespaced: true,
  state: {
    isAuthWs: false,
    isAuth: false,
    isOpenWs: false,
    user: {
      username: '',
      nickname: '',
      region: '',
      email: '',
      role: '',
      iat: 0,
      exp: 0,
      token: '',
    },
  },
  getters: {
    currentBreakPoint: (state) => state.testVal,
    getToken: (state) => state.user.token,
  },
  mutations: {
    SET_WS_IS_AUTH(state, isAuthWs) {
      state.isAuthWs = isAuthWs
    },
    SET_WS_STATE(state, wsState) {
      state.isOpenWs = wsState
    },
    SET_USER(state, token) {
      const user = jwt.decode(token)
      state.isAuth = true
      state.user = {
        ...user,
        token: token,
      }
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...user,
          token,
        })
      )
    },
    SET_USER_FROM_LOCAL_STORAGE(state, userData) {
      state.user = userData
    },
  },
  actions: {
    getAllUsers() {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getAllUsers',
          query: {
            method: 'get',
            model: 'User',
            filter: {},
            fields: 'id profile.nickname profile.avatar role',
          },
        })
      )
    },
    loginAction(ctx, userData) {
      return new Promise((resolve, reject) => {
        this._vm.$axios
          .post('user/login', userData)
          .then((res) => {
            if (res.data.errors) {
              reject('error')
            }
            console.log('res', res)
            if (res.data) {
              console.log(res.data)
              if (res.data.token) {
                // send token in backend with websocket
                this._vm.$ws.send(
                  JSON.stringify({
                    event: 'authorize',
                    token: res.data.token,
                  })
                )
                ctx.commit('SET_USER', res.data.token)
                resolve(true)
              }
            }
          })
          .catch((e) => {
            console.log(e)
            reject('error')
          })
      })
    },
    logoutAction(ctx) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('userData')
        resolve()
      })
    },
    testAction(ctx) {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getUserLabel',
          query: {
            method: 'get',
            model: 'User',
            filter: { id: 10000 },
            fields: 'profile',
          },
        })
      )
    },
    sendAuth() {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'authorize',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlcXVpcmVkIiwibmlja25hbWUiOiJyZXF1aXJlZCIsInJlZ2lvbiI6InJlcXVpcmVkIiwiZW1haWwiOiJtYWlsQG1haWwucnUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjU5ODU1NzEsImV4cCI6MTY2NTk4OTE3MX0.8P3Sw0XK8zQco9Kr6dTMClN_F9TfaJ-wnKyrmkfYU8Q',
        })
      )
    },
  },
}
