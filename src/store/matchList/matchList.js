import sort, { getIdStandart } from '@/libs/functions.js'

export default {
  namespaced: true,
  state: {
    initArray: [
      {
        _id: '635256ff5cb3ae8cffd73196',
        id: '88ea8057-5d85-4199-96f1-3b1a808b17b4',
        game: 'StandOff2',
        score: {
          mapName: 'testMap',
          command1: 15,
          command2: 15,
        },
        members: [
          {
            name: 'test_Coffee_18',
            command: 'command1',
            statistic: {
              kills: 0,
              deaths: 0,
              assists: 0,
              _id: '635256ff5cb3ae8cffd73198',
            },
          },
        ],
        __v: 0,
      },
    ],
    array: [
      {
        _id: '635256ff5cb3ae8cffd73196',
        id: '88ea8057-5d85-4199-96f1-3b1a808b17b4',
        game: 'StandOff2',
        score: {
          mapName: 'testMap',
          command1: 15,
          command2: 15,
        },
        members: [
          {
            name: 'test_Coffee_18',
            command: 'command1',
            statistic: {
              kills: 0,
              deaths: 0,
              assists: 0,
              _id: '635256ff5cb3ae8cffd73198',
            },
          },
        ],
        __v: 0,
      },
    ],
    arraySorted: [
      {
        _id: '635256ff5cb3ae8cffd73196',
        id: '88ea8057-5d85-4199-96f1-3b1a808b17b4',
        game: 'StandOff2',
        score: {
          mapName: 'testMap',
          command1: 15,
          command2: 15,
        },
        members: [
          {
            name: 'test_Coffee_18',
            command: 'command1',
            statistic: {
              kills: 0,
              deaths: 0,
              assists: 0,
              _id: '635256ff5cb3ae8cffd73198',
            },
          },
        ],
        __v: 0,
      },
    ],
    fields: [
      { key: 'id', label: 'id' },
      { key: 'game', label: 'game' },
      { key: 'show_details', label: 'show_details' },
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
          if (el.reason.includes(state.searchQuery)) {
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
          showDetail: false,
        })
      }

      state.array = users
      state.initArray = users
    },
    EDIT(state, id) {
      const editElem = state.arraySorted[state.arraySorted.findIndex((el) => el._id === id)]
      editElem.isEdit ? (editElem.isEdit = false) : (editElem.isEdit = true)
    },
    SORT_WITH_SEARCH_QUERY(state, searchQuery) {
      if (searchQuery === '') {
        state.array = state.initArray
      }
      const uNew = state.initArray.filter((el) => {
        if (el.reason.includes(searchQuery)) {
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
    SET_FIELD(state, pay) {
      const fieldArr = pay.IDF.field.split('.')
      const changedItemIndex = state.arraySorted.findIndex((el) => el._id === pay.IDF.id)
      if (fieldArr.length === 1) {
        state.arraySorted[changedItemIndex][fieldArr[0]] = pay.value
      } else if (fieldArr.length === 2) {
        state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]] = pay.value
      } else if (fieldArr.length === 3) {
        state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]][fieldArr[2]] = pay.value
      } else if (fieldArr.length === 4) {
        state.arraySorted[changedItemIndex][fieldArr[0]][fieldArr[1]][fieldArr[2]][fieldArr[3]] = pay.value
      }
    },
  },
  actions: {
    addMember(ctx, payload) {
      console.log('STORE__addMember() form:', payload)
      const data = JSON.stringify({
        event: 'syscall',
        label: 'updateMatch',
        query: {
          model: 'MatchList',
          filter: {
            _id: payload._id,
          },
          execute: {
            function: 'addRecords',
            params: [
              {
                name: payload.form.name,
                command: payload.form.command,
                statistic: {
                  kills: payload.form.kills,
                  deaths: payload.form.deaths,
                  assists: payload.form.assists,
                },
              },
            ],
          },
        },
      })
      console.log(data)
      this._vm.$ws.send(data)
    },
    save(ctx, id) {
      console.log(id)
      const s = ctx.state.arraySorted[getIdStandart(ctx.state, id)]
      console.log(s)
      const data = JSON.stringify({
        event: 'query',
        label: 'updateMatch',
        query: {
          method: 'set',
          model: 'MatchList',
          filter: {
            _id: id,
          },
          fields: 'members',
          update: {
            count: 'one',
            set: {
              members: [...s.members],
            },
          },
        },
      })
      console.log(data)
      this._vm.$ws.send(data)
    },
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
      console.log('getAll')
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getAllMatches',
          query: {
            method: 'get',
            model: 'MatchList',
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
  },
}
