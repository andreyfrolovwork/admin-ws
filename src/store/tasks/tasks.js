import sort, { getId } from '@/libs/functions.js'

export default {
  namespaced: true,
  state: {
    usersInitArr: [
      {
        _id: '633428306dbd481eb40fd331',
        owner: 'testtest',
        name: 'victories',
        flags: {
          complete: false,
          static: false,
          _id: {
            $oid: '633428306dbd481eb40fd330',
          },
        },
        progress: {
          currentPoints: 0,
          requiredPoints: 16,
          _id: {
            $oid: '633428306dbd481eb40fd332',
          },
        },
        rewards: [
          {
            amount: 800,
            type: 'mp',
            _id: {
              $oid: '633428306dbd481eb40fd334',
            },
          },
        ],
        __v: 1,
        expires: {
          expirationType: 'day',
          expirationDate: {
            $date: {
              $numberLong: '1664448944964',
            },
          },
          _id: {
            $oid: '633428306dbd481eb40fd335',
          },
        },
        _showDetails: false,
      },
    ],
    usersArray: [
      {
        _id: {
          $oid: '633428306dbd481eb40fd331',
        },
        owner: 'testtest',
        name: 'victories',
        flags: {
          complete: false,
          static: false,
          _id: {
            $oid: '633428306dbd481eb40fd330',
          },
        },
        progress: {
          currentPoints: 0,
          requiredPoints: 16,
          _id: {
            $oid: '633428306dbd481eb40fd332',
          },
        },
        rewards: [
          {
            amount: 800,
            type: 'mp',
            _id: {
              $oid: '633428306dbd481eb40fd334',
            },
          },
        ],
        __v: 1,
        expires: {
          expirationType: 'day',
          expirationDate: {
            $date: {
              $numberLong: '1664448944964',
            },
          },
          _id: {
            $oid: '633428306dbd481eb40fd335',
          },
        },
        showDetail: false,
      },
    ],
    usersSorted: [
      {
        _id: {
          $oid: '633428306dbd481eb40fd331',
        },
        owner: 'testtest',
        name: 'victories',
        flags: {
          complete: false,
          static: false,
          _id: {
            $oid: '633428306dbd481eb40fd330',
          },
        },
        progress: {
          currentPoints: 0,
          requiredPoints: 16,
          _id: {
            $oid: '633428306dbd481eb40fd332',
          },
        },
        rewards: [
          {
            amount: 800,
            type: 'mp',
            _id: {
              $oid: '633428306dbd481eb40fd334',
            },
          },
        ],
        __v: 1,
        expires: {
          expirationType: 'day',
          expirationDate: {
            $date: {
              $numberLong: '1664448944964',
            },
          },
          _id: {
            $oid: '633428306dbd481eb40fd335',
          },
        },
        showDetail: false,
      },
    ],
    fields: [
      { key: '_id', label: '_id' },
      { key: 'owner', label: 'owner' },
      { key: 'name', label: 'name' },
      { key: 'show_details', label: 'show_details' },
      /*    { key: 'Действия' },*/
    ],
    from: 0,
    to: 10,
    searchQuery: '',
    perPageOptions: [3, 10, 25, 50, 100],
    currentPage: 1,
    /* totalUsers: 24,*/
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
        state.usersArray = state.usersInitArr
      } else {
        const uNew = state.usersInitArr.filter((el) => {
          if (el.name.includes(state.searchQuery)) {
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
    SET_ALL_TASKS(state, usersData) {
      let users = []
      for (let user in usersData) {
        users.push({
          ...usersData[user],
          showDetail: false,
          isEdit: false,
        })
      }

      state.usersArray = users
      state.usersInitArr = users
      /*      let users = []

                                                                        for (let i = 0; i < 20; i++) {
                                                                          for (let user in usersData) {
                                                                            users.push(usersData[user])
                                                                          }
                                                                        }
                                                                        const nus = users.map((user, i) => {
                                                                          return {
                                                                            ...user,
                                                                            id: i,
                                                                          }
                                                                        })
                                                                        state.data.statisticsItems[1].title = nus.length
                                                                        state.usersArray = nus*/
    },
    SORT_WITH_SEARCH_QUERY(state, searchQuery) {
      if (searchQuery === '') {
        state.usersArray = state.usersInitArr
      }
      const uNew = state.usersInitArr.filter((el) => {
        if (el.name.includes(searchQuery)) {
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
    EDIT_TASK(state, id) {
      const editTask = state.usersSorted[state.usersSorted.findIndex((el) => el._id === id)]
      editTask.isEdit ? (editTask.isEdit = false) : (editTask.isEdit = true)
    },
    /*    CANCEL_EDIT_TASK(state, id) {
              const editedTaskIndex = getId(state, id)
              const usersInitArrElement = state.usersInitArr[state.usersInitArr.findIndex((el) => el._id === id)]
              console.log(usersInitArrElement)
              state.usersSorted[editedTaskIndex] = { ...usersInitArrElement }
              const editTask = state.usersSorted[editedTaskIndex]
              editTask.isEdit = false
            },*/
    SET_OWNER(state, pay) {
      const changedItemIndex = state.usersSorted.findIndex((el) => el._id === pay.id)
      state.usersSorted[changedItemIndex].owner = pay.value
    },
    SET_NAME(state, pay) {
      const changedItemIndex = state.usersSorted.findIndex((el) => el._id === pay.id)
      state.usersSorted[changedItemIndex].name = pay.value
    },
    SET_FIELD(state, pay) {
      const fieldArr = pay.IDF.field.split('.')
      const changedItemIndex = state.usersSorted.findIndex((el) => el._id === pay.IDF.id)
      if (fieldArr.length === 1) {
        state.usersSorted[changedItemIndex][fieldArr[0]] = pay.value
      } else if (fieldArr.length === 2) {
        state.usersSorted[changedItemIndex][fieldArr[0]][fieldArr[1]] = pay.value
      } else if (fieldArr.length === 3) {
        state.usersSorted[changedItemIndex][fieldArr[0]][fieldArr[1]][fieldArr[2]] = pay.value
      } else if (fieldArr.length === 4) {
        state.usersSorted[changedItemIndex][fieldArr[0]][fieldArr[1]][fieldArr[2]][fieldArr[3]] = pay.value
      }
    },
    ADD_REWARD(state, IDF) {
      const changedIndex = getId(state, IDF.id)
      state.usersSorted[changedIndex].rewards.push({
        amount: 0,
        type: '',
      })
    },
  },
  actions: {
    saveTask(ctx, id) {
      const s = ctx.state.usersSorted[getId(ctx.state, id)]
      console.log(s)
      const data = JSON.stringify({
        event: 'query',
        label: 'updateTasks',
        query: {
          method: 'set',
          model: 'Task',
          filter: {
            _id: id,
          },
          fields:
            'owner name flags.complete flags.static progress.currentPoints progress.requiredPoints rewards expires',
          update: {
            count: 'one',
            set: {
              owner: s.owner,
              name: s.name,
              flags: {
                complete: s.flags.complete,
                static: s.flags.static,
              },
              progress: {
                currentPoints: s.progress.currentPoints,
                requiredPoints: s.progress.requiredPoints,
              },
              rewards: [...s.rewards],
              expires: {
                expirationType: s.expires.expirationType,
                expirationDate: s.expires.expirationDate,
              },
            },
          },
        },
      })
      console.log(data)
      this._vm.$ws.send(data)
    },
    deleteTask() {},
    getMathesCount() {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getAllTasks',
          query: {
            method: 'get',
            model: 'Task',
            filter: {},
            fields: '',
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
    setAllTasks(ctx, tasks) {
      ctx.commit('SET_ALL_TASKS', tasks)
      ctx.commit('SORT')
    },
    getAllTasks() {
      this._vm.$ws.send(
        JSON.stringify({
          event: 'query',
          label: 'getAllTasks',
          query: {
            method: 'get',
            model: 'Task',
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
