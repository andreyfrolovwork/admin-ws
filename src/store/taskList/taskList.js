import sort from '@/libs/functions.js'

export default {
  namespaced: true,
  state: {
    initArray: [
      {
        _id: '6352e10dc5cc0e8c450652c3',
        owner: '6352e10cc5cc0e8c450652c0',
        tasks: [
          '6352e10dc5cc0e8c450652c5',
          '6352e10dc5cc0e8c450652c6',
          '6352e10dc5cc0e8c450652ce',
          '6352e10dc5cc0e8c450652ca',
          '6352e10dc5cc0e8c450652d2',
          '6352e10dc5cc0e8c450652d6',
          '6352e10ec5cc0e8c450652df',
          '6352e10ec5cc0e8c450652e1',
        ],
        __v: 1,
      },
    ],
    array: [
      {
        _id: '6352e10dc5cc0e8c450652c3',
        owner: '6352e10cc5cc0e8c450652c0',
        tasks: [
          '6352e10dc5cc0e8c450652c5',
          '6352e10dc5cc0e8c450652c6',
          '6352e10dc5cc0e8c450652ce',
          '6352e10dc5cc0e8c450652ca',
          '6352e10dc5cc0e8c450652d2',
          '6352e10dc5cc0e8c450652d6',
          '6352e10ec5cc0e8c450652df',
          '6352e10ec5cc0e8c450652e1',
        ],
        __v: 1,
      },
    ],
    arraySorted: [
      {
        _id: '6352e10dc5cc0e8c450652c3',
        owner: '6352e10cc5cc0e8c450652c0',
        tasks: [
          '6352e10dc5cc0e8c450652c5',
          '6352e10dc5cc0e8c450652c6',
          '6352e10dc5cc0e8c450652ce',
          '6352e10dc5cc0e8c450652ca',
          '6352e10dc5cc0e8c450652d2',
          '6352e10dc5cc0e8c450652d6',
          '6352e10ec5cc0e8c450652df',
          '6352e10ec5cc0e8c450652e1',
        ],
        __v: 1,
      },
    ],
    fields: [
      { key: 'id', label: 'id' },
      { key: 'owner', label: 'owner' },
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
          if (el.owner.includes(state.searchQuery)) {
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
      let array = []
      for (let el in arrayData) {
        array.push(arrayData[el])
      }

      array = array.map((el) => {
        return {
          ...el,
          tasks: el.tasks.map((task) => {
            return {
              id: task,
              isLoaded: true,
            }
          }),
        }
      })

      state.array = array
      state.initArray = array
    },
    SORT_WITH_SEARCH_QUERY(state, searchQuery) {
      if (searchQuery === '') {
        state.array = state.initArray
      }
      const uNew = state.initArray.filter((el) => {
        if (el.owner.includes(searchQuery)) {
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
          label: 'getAllTaskList',
          query: {
            method: 'get',
            model: 'TaskList',
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
