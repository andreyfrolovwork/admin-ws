<template>
  <ul
    id="main-menu-navigation"
    class="nav navbar-nav"
  >
    <component
      :is="resolveNavComponent(item)"
      v-for="item in items"
      :key="item.header || item.title"
      :item="item"
    />
  </ul>
</template>

<script>
import HorizontalNavMenuHeaderLink from '../horizontal-nav-menu-header-link/HorizontalNavMenuHeaderLink.vue'
import HorizontalNavMenuHeaderGroup from '../horizontal-nav-menu-header-group/HorizontalNavMenuHeaderGroup.vue'

import useJwt from '@/auth/jwt/useJwt'

import { initialAbility } from '@/libs/acl/config'

export default {
  components: {
    HorizontalNavMenuHeaderLink,
    HorizontalNavMenuHeaderGroup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const resolveNavComponent = item => {
      if (item.children) return 'horizontal-nav-menu-header-group'
      return 'horizontal-nav-menu-header-link'
    }

    return {
      resolveNavComponent,
    }
  },
  

  methods: {
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
  }
}
</script>

<style>
  @media (min-width: 1920px) {
    .logout-span {
      display: none;
    }
  }
</style>