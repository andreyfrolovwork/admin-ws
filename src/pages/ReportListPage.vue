<template>

  <div>

    <b-card no-body class="mb-0">
      <!--      <button @click="sort">sort</button>    -->
      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Показать</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="$store.state.reportslist.perPageOptions"
                      :clearable="false" class="per-page-selector d-inline-block mx-50"/>
            <label>записей</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="searchQuery" class="d-inline-block mr-1"
                            placeholder="Поиск..."/>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.reportslist.arraySorted" responsive
               :fields="$store.state.reportslist.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

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
                        <span class="text-muted">Показано {{ $store.state.reportslist.from }} до {{ $store.state.reportslist.to }} из {{
                            $store.state.reportslist.array.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.reportslist.array.length" :per-page="perPage"
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
import vSelect from "vue-select"

export default {
  name: "ReportListPage",
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

  computed: {
    perPage: {
      set: function (value) {
        this.$store.dispatch('reportslist/setPerPage', value)
      },
      get: function () {
        return this.$store.state.reportslist.perPage
      }
    },
    searchQuery:{
      set:function(value){
        console.log('set query', value)
        this.$store.dispatch('reportslist/setSearchQuery', value)
      },
      get:function (){
        return this.$store.state.reportslist.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('reportslist/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.reportslist.currentPage
      }
    }
  },
  methods: {
    sort() {
      this.$store.dispatch('reportslist/setPerPage')
    },
    setRole(payload) {
      this.$store.dispatch('reportslist/setRole', payload)
    }
  },
  mounted() {
    this.$store.dispatch('reportslist/getAll')
  }

}
</script>

<style scoped>

</style>
