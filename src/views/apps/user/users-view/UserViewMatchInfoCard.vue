<template>

  <div>

    <b-sidebar id="add-new-user-sidebar" :visible="isAddNewUserSidebarActive" bg-variant="white"
      sidebar-class="sidebar-lg" shadow backdrop no-header right>
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            Редактировать статистику
          </h5>

          <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />

        </div>

      </template>
    </b-sidebar>

    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>


          <!-- Search -->
          <b-col cols="12" md="12">
            Синие
            <div class="d-flex align-items-center justify-content-end">
              <b-button variant="primary" @click="isAddNewUserSidebarActive = !isAddNewUserSidebarActive">
                <span class="text-nowrap">Редактировать</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" class="position-relative" :items="fetchUsers" responsive :fields="tableColumns"
        primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc">

        <!-- Column: User -->
        <template #cell(Ники)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.user }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(Убийства)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.kills }}</small>
          </b-media>
        </template>

        <template #cell(Смерти)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.death }}</small>
          </b-media>
        </template>

        <template #cell(Ассисты)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.assists }}</small>
          </b-media>
        </template>

        <template #cell(Очки)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.points }}</small>
          </b-media>
        </template>
        
      </b-table>
    </b-card>

    <b-card no-body class="mb-0 mt-2">

      <div class="m-2">
        <b-row>


          <!-- Search -->
          <b-col cols="12" md="12">
            Белые
            <div class="d-flex align-items-center justify-content-end">
              <b-button variant="primary" @click="isAddNewUserSidebarActive = !isAddNewUserSidebarActive">
                <span class="text-nowrap">Редактировать</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-table ref="refUserListTable" class="position-relative" :items="fetchUsers" responsive :fields="tableColumns"
        primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc">

        <!-- Column: User -->
        <template #cell(Ники)="">
          <b-media vertical-align="center" v-for="u in userData.white" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.user }}</small>
          </b-media>
        </template>

        <template #cell(Убийства)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.kills }}</small>
          </b-media>
        </template>

        <template #cell(Смерти)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.death }}</small>
          </b-media>
        </template>

        <template #cell(Ассисты)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.assists }}</small>
          </b-media>
        </template>

        <template #cell(Очки)="">
          <b-media vertical-align="center" v-for="u in userData.blue" :key="u" class="mt-2">
            <small class="font-weight-bold d-block text-nowrap">{{ u.points }}</small>
          </b-media>
        </template>

      </b-table>
    </b-card>

  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BSidebar, BForm, BFormGroup, BFormInvalidFeedback
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useUsersList from '../users-list/useUsersList-copy'
import userStoreModule from '../userStoreModule'

export default {
  data() {
    return {
      isAddNewUserSidebarActive: false
    }
  },
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    BSidebar, BForm, BFormGroup, BFormInvalidFeedback
  },

  props: {
    userData: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const isAddNewUserSidebarActive = ref(false)

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]

    const planOptions = [
      { label: 'Basic', value: 'basic' },
      { label: 'Company', value: 'company' },
      { label: 'Enterprise', value: 'enterprise' },
      { label: 'Team', value: 'team' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList()

    return {

      // Sidebar
      isAddNewUserSidebarActive,

      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      roleOptions,
      planOptions,
      statusOptions,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
