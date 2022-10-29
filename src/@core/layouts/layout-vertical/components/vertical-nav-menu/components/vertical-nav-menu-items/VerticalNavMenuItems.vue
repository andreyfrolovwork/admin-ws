<template>
  <ul>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="item in items"
      :key="item.header || item.title"
      :item="item"
    />
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'

import useJwt from '@/auth/jwt/useJwt'

import { initialAbility } from '@/libs/acl/config'

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
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
      display: none
    }
  }
</style>
