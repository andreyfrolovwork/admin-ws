import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import appData from './app-data'
import users from './users/users.js'
import tasks from './tasks/tasks.js'
import mainPage from './main/main.js'
import matchList from './matchList/matchList.js'
import reportslist from './reportslist/reportslist.js'
import orderList from './orderlist/orderList.js'
import taskList from './taskList/taskList.js'

import socketPlugin from './socketPlugin/socketPlugin.js'
import localStoragePlugin from './localStoragePlugin/localStoragePlugin.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appData,
    mainPage,
    users,
    matchList,
    reportslist,
    orderList,
    taskList,
    tasks,
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
  },
  plugins: [socketPlugin(), localStoragePlugin()],
  strict: process.env.DEV,
})
