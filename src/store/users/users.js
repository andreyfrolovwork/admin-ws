import sort from '@/libs/functions.js'

export default {
  namespaced: true,
  state: {
    data: {
      statisticsItems: [
        {
          icon: 'PlayIcon',
          color: 'light-primary',
          title: 100,
          subtitle: 'Игр онлайн',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: 23,
          subtitle: 'Пользователей',
          customClass: 'mb-2 mb-xl-0',
        },
      ],
      statisticsProfit: {
        series: [
          {
            data: [0, 20, 5, 30, 15, 45],
          },
        ],
        count: 99,
      },
    },
    usersInitArr: [
      {
        id: 100000000,
        profile: { nickname: 'Papyrus' },
        role: 'default',
        _id: '632c971a9ae7c5fe398a7c4e',
      },
    ],
    usersArray: [
      {
        id: 100000000,
        profile: { nickname: 'Papyrus' },
        role: 'default',
        _id: '632c971a9ae7c5fe398a7c4e',
      },
    ],
    usersSorted: [
      {
        id: 100000000,
        profile: { nickname: 'Papyrus' },
        role: 'default',
        _id: '632c971a9ae7c5fe398a7c4e',
      },
    ],
    fields: [
      { key: 'avatar', label: 'avatar' },
      { key: 'id', label: 'id' },
      { key: 'nickname', label: 'nickname' },
      { key: 'prefix', label: 'prefix' },
      { key: 'role', label: 'role' },
      /*   { key: 'Действия' },*/
    ],
    from: 0,
    to: 10,
    searchQuery: '',
    perPageOptions: [3, 10, 25, 50, 100],
    currentPage: 1,
    /* totalUsers: 24,*/
    perPage: 10,
    pages: 1,
    prefixes: ['YouTube', 'Funny'],
  },
  mutations: {
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage
    },
    SET_PER_PAGE(state, perPage) {
      state.perPage = perPage
    },
    SORT(state) {
      if (state.searchQuery === '') {
        state.usersArray = state.usersInitArr
      } else {
        const uNew = state.usersInitArr.filter((el) => {
          if (el.profile.nickname.includes(state.searchQuery)) {
            return true
          }
        })

        state.usersArray = uNew
      }

      let sorted = []
      sorted = sort(state.usersArray, {
        currentPage: state.currentPage,
        perPage: state.perPage,
      })
      state.usersSorted = sorted

      state.pages = Math.floor(state.usersArray.length / state.perPage)

      state.from = state.currentPage * state.perPage - state.perPage

      state.to = state.currentPage * state.perPage
    },
    SET_ALL_USERS(state, usersData) {
      let users = []
      for (let user in usersData) {
        users.push(usersData[user])
      }
      users = users.map((user) => {
        let avatar = ''
        if (user.profile.hasOwnProperty('avatar')) {
          let binary = Buffer.from(user.profile.avatar.buffer.data) //or Buffer.from(data, 'binary')
          let blob = new Blob([binary], { type: 'image/png' })
          let urlCreator = window.URL || window.webkitURL
          let imageUrl = urlCreator.createObjectURL(blob)
          avatar = imageUrl
          /*          let img = document.querySelector(`#${user._id}`)
          img.src = imageUrl*/
        }
        return {
          ...user,
          avatar: avatar,
        }
      })
      state.data.statisticsItems[1].title = users.length
      state.data.statisticsProfit.count = users.length

      state.usersArray = users
      state.usersInitArr = users
    },
    SORT_WITH_SEARCH_QUERY(state, searchQuery) {
      if (searchQuery === '') {
        state.usersArray = state.usersInitArr
      }
      const uNew = state.usersInitArr.filter((el) => {
        if (el.profile.nickname.includes(searchQuery)) {
          return true
        }
      })

      state.usersArray = uNew
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
    SET_PREFIXES(state, prefixes) {
      state.prefixes = prefixes
    },
  },
  actions: {
    getMathesCount() {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getMatchesCount',
          query: {
            method: 'get',
            model: 'MatchList',
            filter: {},
            fields: '_id',
          },
        })
      )
    },
    setSearchQuery(ctx, searchQuery) {
      /*      ctx.commit('SORT_WITH_SEARCH_QUERY', searchQuery)*/
      ctx.commit('SET_SEARCH_QUERY', searchQuery)
      ctx.commit('SORT')
    },
    setRole(ctx, { role, id }) {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'updateUsers',
          query: {
            method: 'set',
            model: 'User',
            filter: { _id: id },
            fields: 'role',
            update: {
              count: 'one',
              set: { role: role },
            },
          },
        })
      )
    },
    setCurrentPage(ctx, page) {
      console.log('set current page', page)
      ctx.commit('SET_CURRENT_PAGE', page)
      ctx.commit('SORT')
    },
    setAllUsers(ctx, users) {
      ctx.commit('SET_ALL_USERS', users)
      ctx.commit('SORT')
    },
    getUserPrefix() {
      console.log('STORE__getAllUsers()')
      this._vm.$ws.send(
        JSON.stringify({
          event: 'syscall',
          label: 'getUserPrefix',
          query: {
            model: 'User',
            execute: {
              function: 'getPrefixes',
              params: [],
            },
          },
        })
      )
    },
    setPrefix(ctx, payload) {
      console.log('STORE__setPrefix()')
      this._vm.$ws.send(
        JSON.stringify({
          event: 'syscall',
          label: 'setPrefix',
          query: {
            method: 'get',
            model: 'User',
            needFeedback: true,
            execute: {
              function: 'setPrefix',
              params: [payload.nickname, payload.prefix],
            },
          },
        })
      )
    },
    getAllUsers() {
      console.log('STORE__getAllUsers()')
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getAllUsers',
          query: {
            method: 'get',
            model: 'User',
            filter: {},
            fields: 'id profile.nickname profile.avatar role prefix',
          },
        })
      )
    },
    setPerPage(ctx, perPage) {
      ctx.commit('SET_PER_PAGE', perPage)
      ctx.commit('SORT')
    },
    addPrefix(ctx, prefix) {
      console.log('STORE__addPrefix()')
      this._vm.$ws.send(
        JSON.stringify({
          event: 'syscall',
          label: 'addPrefix',
          query: {
            method: 'get',
            model: 'User',
            needFeedback: true,
            execute: {
              function: 'addPrefix',
              params: [prefix],
            },
          },
        })
      )
    },
  },
}
