<template>

  <div>
    <AddPrefix/>
    <b-card no-body class="mb-0">
      <!--      <button @click="sort">sort</button>    -->
      <img src="" alt="" id="photo">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Показать</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="$store.state.users.perPageOptions"
                      :clearable="false" class="per-page-selector d-inline-block mx-50"/>
            <label>записей</label>
          </b-col>
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <b-button variant="primary"  v-b-modal.modal-4 size="sm">Добавить префикс</b-button>
          </b-col>
          <!-- Search -->
          <b-col cols="12" md="4">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1"
                            placeholder="Поиск..."/>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.users.usersSorted" responsive
               :fields="$store.state.users.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >
        <!--  Column: avatar-->
        <template #cell(avatar)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">
              <img v-if="data.item.avatar !==''" class="users-avatar-img"  :src="data.item.avatar" alt="">
              <img v-else class="users-avatar-img"  :src="require('@/assets/images/user.png')" alt=""></small>
          </b-media>
        </template>
        <!--  Column: ID-->
        <template #cell(id)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.id }}</small>
          </b-media>
        </template>

        <!-- Column: User -->
        <template #cell(nickname)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.profile.nickname }}</small>
          </b-media>
        </template>

        <template #cell(prefix)="data">
          <div class="text-nowrap" v-if="data.item.hasOwnProperty('prefix')">
            <span class="align-text-top text-capitalize">{{ data.item.prefix }}</span>
            <b-dropdown variant="link" no-caret>

              <template #button-content>
                <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
              </template>
              <b-dropdown-item v-for="prefix in $store.state.users.prefixes">
                <span @click="$store.dispatch('users/setPrefix',{nickname:data.item.profile.nickname, prefix})" class="align-middle ml-50">{{ prefix }}</span>
              </b-dropdown-item>
<!--              <b-dropdown-item>
                <span @click="setRole({
                role:'privileged',
                id:data.item._id
                })" class="align-middle ml-50">privileged</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <span @click="setRole({
                role:'admin',
                id:data.item._id
                })" class="align-middle ml-50">admin</span>
              </b-dropdown-item>-->

            </b-dropdown>
          </div>
<!--          <b-media v-if="data.item.hasOwnProperty('prefix')" vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.prefix }}</small>
          </b-media>-->
          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">Префикс отсутствует</small>
          </b-media>
        </template>
        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
            <b-dropdown variant="link" no-caret>

              <template #button-content>
                <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
              </template>

              <b-dropdown-item>
                <span @click="setRole({
                role:'default',
                id:data.item._id
                })" class="align-middle ml-50">default</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <span @click="setRole({
                role:'privileged',
                id:data.item._id
                })" class="align-middle ml-50">privileged</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <span @click="setRole({
                role:'admin',
                id:data.item._id
                })" class="align-middle ml-50">admin</span>
              </b-dropdown-item>

            </b-dropdown>
          </div>
        </template>

        <!-- Column: Actions -->
        <template #cell(Действия)="data">
          <b-dropdown variant="link" no-caret>

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body"/>
            </template>
            <b-dropdown-item>
              <feather-icon icon="FileTextIcon"/>
              <span class="align-middle ml-50">Информация</span>
            </b-dropdown-item>
            <!--
                        <b-dropdown-item>
                          <feather-icon icon="TrashIcon"/>
                          <span class="align-middle ml-50">Удалить</span>
                        </b-dropdown-item>-->
          </b-dropdown>
        </template>
      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Показано {{ $store.state.users.from }} до {{ $store.state.users.to }} из {{
                            $store.state.users.usersArray.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.users.usersArray.length" :per-page="perPage"
                          first-number last-number
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
import AddPrefix from '@/pages/components/AddPrefix.vue'
import vSelect from "vue-select"

export default {
  name: "UsersPage2",
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
    AddPrefix
  },
  computed: {
    perPage: {
      set: function (value) {
        this.$store.dispatch('users/setPerPage', value)
      },
      get: function () {
        return this.$store.state.users.perPage
      }
    },
    searchQuery:{
      set:function(value){
        console.log('set query', value)
        this.$store.dispatch('users/setSearchQuery', value)
      },
      get:function (){
        return this.$store.state.users.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('users/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.users.currentPage
      }
    }
  },
  methods: {
    sort() {
      this.$store.dispatch('users/setPerPage')
    },
    setRole(payload) {
      this.$store.dispatch('users/setRole', payload)
    }
  },
  mounted() {
    this.$store.dispatch('users/getUserPrefix')
    this.$store.dispatch('users/getAllUsers')
  }

}
</script>

<style scoped>
.users-avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
