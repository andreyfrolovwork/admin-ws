import sort, { getIdStandart } from '@/libs/functions.js'

export default {
  namespaced: true,
  state: {
    initArray: [
      {
        _id: '635cf767e82e83820f44f335',
        name: 'testTask',
        minPoints: 0,
        maxPoints: 5,
        stepForPoints: 1,
        reward: {
          mp: 100,
        },
        __v: 0,
      },
    ],
    array: [
      {
        _id: '635cf767e82e83820f44f335',
        name: 'testTask',
        minPoints: 0,
        maxPoints: 5,
        stepForPoints: 1,
        reward: {
          mp: 100,
        },
        __v: 0,
      },
    ],
    arraySorted: [
      {
        _id: '635cf767e82e83820f44f335',
        name: 'testTask',
        minPoints: 0,
        maxPoints: 5,
        stepForPoints: 1,
        reward: {
          mp: 100,
        },
        __v: 0,
      },
    ],
    fields: [
      { key: 'id', label: 'id' },
      { key: 'name', label: 'name' },
      { key: 'minPoints', label: 'minPoints' },
      { key: 'maxPoints', label: 'maxPoints' },
      { key: 'stepForPoints', label: 'stepForPoints' },
      { key: 'expirationType', label: 'expirationType' },
      { key: 'reward-mp', label: 'reward-mp' },
      { key: 'reward-exp', label: 'reward-exp' },
      { key: 'actions', label: 'Действия' },
    ],
    from: 0,
    to: 10,
    searchQuery: '',
    perPageOptions: [3, 10, 25, 50, 100],
    currentPage: 1,
    perPage: 10,
    pages: 1,
  },
  getters: {},
  mutations: {
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage
    },
    SET_PER_PAGE(state, perPage) {
      state.perPage = perPage
    },
    SORT(state) {
      if (state.searchQuery === '') {
        state.array = state.initArray
      } else {
        const uNew = state.initArray.filter((el) => {
          if (el.name.includes(state.searchQuery)) {
            return true
          }
        })

        state.array = uNew
      }

      let sorted = []
      sorted = sort(state.array, {
        currentPage: state.currentPage,
        perPage: state.perPage,
      })
      state.arraySorted = sorted

      state.pages = Math.floor(state.array.length / state.perPage)

      state.from = state.currentPage * state.perPage - state.perPage

      state.to = state.currentPage * state.perPage
    },
    SET_ALL(state, arrayData) {
      let users = []
      for (let user in arrayData) {
        users.push({
          ...arrayData[user],
          isEdit: false,
        })
      }

      state.array = users
      state.initArray = users
    },
    SORT_WITH_SEARCH_QUERY(state, searchQuery) {
      if (searchQuery === '') {
        state.array = state.initArray
      }
      const uNew = state.initArray.filter((el) => {
        if (el.name.includes(searchQuery)) {
          return true
        }
      })

      state.array = uNew
    },
    SET_MATCHES_COUNT(state, matchesData) {
      let matches = []
      for (let match in matchesData) {
        matches.push(matches[match])
      }
      state.data.statisticsItems[0].title = matches.length
    },
    SET_SEARCH_QUERY(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    EDIT(state, id) {
      const editElem = state.arraySorted[state.arraySorted.findIndex((el) => el._id === id)]
      editElem.isEdit ? (editElem.isEdit = false) : (editElem.isEdit = true)
    },
    SET_FIELD(state, pay) {
      console.log('    SET_FIELD(state, pay) : ', pay)
      const fieldArr = pay.IDF.field.split('.')
      const changedItemIndex = state.arraySorted.findIndex((el) => el._id === pay.IDF.id)
      if (fieldArr.length === 1) {
        state.arraySorted[changedItemIndex][fieldArr[0]] = pay.value
      } else if (fieldArr.length === 2) {
        if (state.arraySorted[changedItemIndex].hasOwnProperty('reward')) {
          state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]] = pay.value
        } else {
          state.arraySorted[changedItemIndex][fieldArr[0]] = {}
          state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]] = pay.value
        }
      } else if (fieldArr.length === 3) {
        state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]][fieldArr[2]] = pay.value
      } else if (fieldArr.length === 4) {
        state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]][fieldArr[2]][fieldArr[3]] = pay.value
      }
    },
  },
  actions: {
    setSearchQuery(ctx, searchQuery) {
      ctx.commit('SET_SEARCH_QUERY', searchQuery)
      ctx.commit('SORT')
    },
    setCurrentPage(ctx, page) {
      console.log('set current page', page)
      ctx.commit('SET_CURRENT_PAGE', page)
      ctx.commit('SORT')
    },
    setAll(ctx, array) {
      ctx.commit('SET_ALL', array)
      ctx.commit('SORT')
    },
    getAll() {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getAllDynamicTasks',
          query: {
            method: 'get',
            model: 'DynamicTask',
            filter: {},
            fields: '',
          },
        })
      )
    },
    setPerPage(ctx, perPage) {
      ctx.commit('SET_PER_PAGE', perPage)
      ctx.commit('SORT')
    },
    save(ctx, id) {
      console.log(id)
      const s = ctx.state.arraySorted[getIdStandart(ctx.state, id)]
      console.log(s)
      const mp = s.reward.mp ? { mp: s.reward.mp } : undefined
      const exp = s.reward.exp ? { exp: s.reward.exp } : undefined
      const data = JSON.stringify({
        event: 'query',
        label: 'updateDynamicTasks',
        query: {
          method: 'set',
          model: 'DynamicTask',
          filter: {
            _id: id,
          },
          fields: 'name maxPoints mixPoints stepForPoints expirationType reward',
          update: {
            count: 'one',
            set: {
              name: s.name,
              minPoints: s.minPoints,
              maxPoints: s.maxPoints,
              stepForPoints: s.stepForPoints,
              expirationType: s.expirationType,
              reward: {
                ...mp,
                ...exp,
              },
            },
          },
        },
      })
      console.log(data)
      this._vm.$ws.send(data)
    },
    add(ctx, payload) {
      console.log('STORE__add() form:', payload)
      const mp = payload.form.mp ? { mp: payload.form.mp } : undefined
      const exp = payload.form.exp ? { exp: payload.form.exp } : undefined
      const data = JSON.stringify({
        event: 'syscall',
        label: 'updateDynamicTasks',
        query: {
          model: 'DynamicTask',
          execute: {
            function: 'createType',
            params: [
              payload.form.name,
              payload.form.minPoints,
              payload.form.maxPoints,
              Number(payload.form.stepForPoints),
              {
                ...mp,
                ...exp,
              },
              payload.form.expirationType,
            ],
          },
        },
      })
      console.log(data)
      this._vm.$ws.send(data)
    },
  },
}
