<template>

  <div>

    <b-card no-body class="mb-0">

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Показать</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions"
                      :clearable="false" class="per-page-selector d-inline-block mx-50"/>
            <label>записей</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Поиск..."/>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table ref="refUserListTable" class="position-relative" :items="users" responsive :fields="fields"
               primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
               :sort-desc.sync="isSortDirDesc">

        <!--  Column: ID-->
        <template #cell(id)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.id }}</small>
          </b-media>
        </template>

        <!-- Column: User -->
        <template #cell(nickname)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.nickname }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
            <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

              <template #button-content>
                <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
              </template>

              <b-dropdown-item>
                <span class="align-middle ml-50">Премиум</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <span class="align-middle ml-50">Пользователь</span>
              </b-dropdown-item>

            </b-dropdown>
          </div>
        </template>

        <!-- Column: Actions -->
        <template #cell(Действия)="">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body"/>
            </template>
            <b-dropdown-item>
              <feather-icon icon="FileTextIcon"/>
              <span class="align-middle ml-50">Информация</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon"/>
              <span class="align-middle ml-50">Удалить</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">Показано {{ dataMeta.from }} до {{ dataMeta.to }} из {{ dataMeta.of }}
              записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" first-number last-number
                          class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18"/>
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18"/>
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import {ref, onUnmounted} from '@vue/composition-api'
import {avatarText} from '@core/utils/filter'
import useUsersList from './useUsersList'
import userStoreModule from '../userStoreModule'

export default {
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

    vSelect,
  },
  data() {
    return {
      users: [
        {key: 1, id: '1', nickname: ' user1', role: "role"},
        {key: 2, id: '2', nickname: ' user13', role: "role"}
      ],
      fields: [{key: 'id', label: 'id'},
        {key: 'nickname', label: 'nickname'},
        {key: 'role', label: 'role'}]
    }
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
      {label: 'Admin', value: 'admin'},
      {label: 'Author', value: 'author'},
      {label: 'Editor', value: 'editor'},
      {label: 'Maintainer', value: 'maintainer'},
      {label: 'Subscriber', value: 'subscriber'},
    ]

    const planOptions = [
      {label: 'Basic', value: 'basic'},
      {label: 'Company', value: 'company'},
      {label: 'Enterprise', value: 'enterprise'},
      {label: 'Team', value: 'team'},
    ]

    const statusOptions = [
      {label: 'Pending', value: 'pending'},
      {label: 'Active', value: 'active'},
      {label: 'Inactive', value: 'inactive'},
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
  mounted() {
    console.log(this.fetchUsers)
  }
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
