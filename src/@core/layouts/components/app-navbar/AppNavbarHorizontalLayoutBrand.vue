<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link
          class="navbar-brand"
          to="/"
        >
          <span class="brand-logo">
            <b-img
              style="max-width: 108px; margin-left: -60px"
              :src="appLogoImage"
              alt="logo"
            />
          </span>
          <h2 class="brand-text mb-0" style="color: #fff">
            {{ appName }}
          </h2>
        </b-link>
      </li>
    </ul> 
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
}
</script>

<style>

</style>
