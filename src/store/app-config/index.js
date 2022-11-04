import { $themeConfig } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    layout: {
      isRTL: localStorage.getItem('isRTL') || $themeConfig.layout.isRTL,
      skin: localStorage.getItem('vuexy-skin') || $themeConfig.layout.skin,
      routerTransition: JSON.parse(localStorage.getItem('routerTransition')) || $themeConfig.layout.routerTransition,
      type: JSON.parse(localStorage.getItem('type')) || $themeConfig.layout.type,
      contentWidth: JSON.parse(localStorage.getItem('contentWidth')) || $themeConfig.layout.contentWidth,
      menu: {
        hidden: JSON.parse(localStorage.getItem('menu-hidden')) || $themeConfig.layout.menu.hidden,
      },
      navbar: {
        type: JSON.parse(localStorage.getItem('nav-type')) || $themeConfig.layout.navbar.type,
        backgroundColor:
          JSON.parse(localStorage.getItem('nav-backgroundColor')) || $themeConfig.layout.navbar.backgroundColor,
      },
      footer: {
        type: JSON.parse(localStorage.getItem('footer-type')) || $themeConfig.layout.footer.type,
      },
    },
  },
  getters: {},
  mutations: {
    TOGGLE_RTL(state) {
      localStorage.setItem('isRTL', JSON.stringify(!state.layout.isRTL))
      state.layout.isRTL = !state.layout.isRTL
      document.documentElement.setAttribute('dir', state.layout.isRTL ? 'rtl' : 'ltr')
    },
    UPDATE_SKIN(state, skin) {
      state.layout.skin = skin

      // Update value in localStorage
      localStorage.setItem('vuexy-skin', skin)

      // Update DOM for dark-layout
      if (skin === 'dark') document.body.classList.add('dark-layout')
      else if (document.body.className.match('dark-layout')) document.body.classList.remove('dark-layout')
    },
    UPDATE_ROUTER_TRANSITION(state, val) {
      localStorage.setItem('routerTransition', JSON.stringify(val))
      state.layout.routerTransition = val
    },
    UPDATE_LAYOUT_TYPE(state, val) {
      localStorage.setItem('type', JSON.stringify(val))
      state.layout.type = val
    },
    UPDATE_CONTENT_WIDTH(state, val) {
      localStorage.setItem('contentWidth', JSON.stringify(val))
      state.layout.contentWidth = val
    },
    UPDATE_NAV_MENU_HIDDEN(state, val) {
      localStorage.setItem('menu-hidden', JSON.stringify(val))
      state.layout.menu.hidden = val
    },
    UPDATE_NAVBAR_CONFIG(state, obj) {
      console.log(obj)
      Object.assign(state.layout.navbar, obj)
      if (obj.hasOwnProperty('type')) {
        localStorage.setItem('nav-type', JSON.stringify(obj))
      }
      if (obj.hasOwnProperty('backgroundColor')) {
        localStorage.setItem('nav-backgroundColor', JSON.stringify(obj))
      }
    },
    UPDATE_FOOTER_CONFIG(state, obj) {
      if (obj.hasOwnProperty('type')) {
        localStorage.setItem('footer-type', JSON.stringify(obj))
      }
      Object.assign(state.layout.footer, obj)
    },
  },
  actions: {},
}
