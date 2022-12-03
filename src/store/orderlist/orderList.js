import sort from '@/libs/functions.js'

export default {
  namespaced: true,
  state: {
    initArray: [
      {
        _id: '6352e138c5cc0e8c45065838',
        id: '084aace6-a385-425e-af06-3f0751e1e350',
        owner: '6352e138c5cc0e8c4506580e',
        country: 'testCountry',
        region: 'testRegion',
        city: 'testCity',
        street: 'testStreet',
        houseNumber: '656',
        postalCode: '5051-5001',
        __v: 0,
      },
    ],
    array: [
      {
        _id: '6352e138c5cc0e8c45065838',
        id: '084aace6-a385-425e-af06-3f0751e1e350',
        owner: '6352e138c5cc0e8c4506580e',
        country: 'testCountry',
        region: 'testRegion',
        city: 'testCity',
        street: 'testStreet',
        houseNumber: '656',
        postalCode: '5051-5001',
        __v: 0,
      },
    ],
    arraySorted: [
      {
        _id: '6352e138c5cc0e8c45065838',
        id: '084aace6-a385-425e-af06-3f0751e1e350',
        owner: '6352e138c5cc0e8c4506580e',
        country: 'testCountry',
        region: 'testRegion',
        city: 'testCity',
        street: 'testStreet',
        houseNumber: '656',
        postalCode: '5051-5001',
        __v: 0,
      },
    ],
    fields: [
      { key: 'id', label: 'id' },
      { key: 'owner', label: 'owner' },
      { key: 'region', label: 'region' },
      { key: 'country', label: 'country' },
      { key: 'city', label: 'city' },
      { key: 'street', label: 'street' },
      { key: 'houseNumber', label: 'houseNumber' },
      { key: 'postalCode', label: 'postalCode' },
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
          label: 'getAllOrders',
          query: {
            method: 'get',
            model: 'Order',
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
