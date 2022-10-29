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
                      :options="$store.state.orderList.perPageOptions"
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.orderList.arraySorted" responsive
               :fields="$store.state.orderList.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

        <!--  Column: ID-->
        <template #cell(id)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.id }}</small>
          </b-media>
        </template>

        <!-- Column: owner -->
        <template #cell(owner)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.owner }}</small>
          </b-media>
        </template>

        <!-- Column: region -->
        <template #cell(region)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.region }}</small>
          </b-media>
        </template>

        <!-- Column: country -->
        <template #cell(country)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.country }}</small>
          </b-media>
        </template>

        <!-- Column: city -->
        <template #cell(city)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.city }}</small>
          </b-media>
        </template>

        <!-- Column: street -->
        <template #cell(street)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.street }}</small>
          </b-media>
        </template>

        <!-- Column: houseNumber -->
        <template #cell(houseNumber)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.houseNumber }}</small>
          </b-media>
        </template>

        <!-- Column: postalCode -->
        <template #cell(postalCode)="data">
          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.postalCode }}</small>
          </b-media>
        </template>

      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Показано {{ $store.state.orderList.from }} до {{ $store.state.orderList.to }} из {{
                            $store.state.orderList.array.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.orderList.array.length" :per-page="perPage"
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
        this.$store.dispatch('orderList/setPerPage', value)
      },
      get: function () {
        return this.$store.state.orderList.perPage
      }
    },
    searchQuery:{
      set:function(value){
        console.log('set query', value)
        this.$store.dispatch('orderList/setSearchQuery', value)
      },
      get:function (){
        return this.$store.state.orderList.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('orderList/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.orderList.currentPage
      }
    }
  },
  methods: {
    sort() {
      this.$store.dispatch('orderList/setPerPage')
    },
    setRole(payload) {
      this.$store.dispatch('orderList/setRole', payload)
    }
  },
  mounted() {
    this.$store.dispatch('orderList/getAll')
  }

}
</script>

<style scoped>

</style>
