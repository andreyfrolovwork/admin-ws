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
                      :options="$store.state.taskList.perPageOptions"
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.taskList.arraySorted" responsive
               :fields="$store.state.taskList.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

        <!--  Column: ID-->
        <template #cell(id)="data">

          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item._id }}</small>
          </b-media>

        </template>


        <template #cell(game)="data">

          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.owner }}</small>
          </b-media>

        </template>

        <template #cell(show_details)="row">

          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Скрыть' : 'Показать' }} детали
          </b-button>

        </template>


        <template #row-details="row">
            <b-card v-for="(task,i) in row.item.tasks" :key="i">
              <TaskComponent :task="task" />
            </b-card>
        </template>


      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Показано {{ $store.state.taskList.from }} до {{ $store.state.taskList.to }} из {{
                            $store.state.taskList.arraySorted.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.taskList.arraySorted.length" :per-page="perPage"
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
  BBadge, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BProgress, BListGroupItem, BListGroup, BFormDatepicker
} from 'bootstrap-vue'
import vSelect from "vue-select"
import TaskComponent from '@/pages/TaskComponent.vue'

export default {
  name: "TasksPage",
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

    BFormCheckbox,
    BProgress,
    BListGroupItem,
    BListGroup,
    BFormDatepicker,
    TaskComponent
  },
  data() {
    return {
      testOwner2: ''
    }
  },
  computed: {
    perPage: {
      set: function (value) {
        this.$store.dispatch('tasks/setPerPage', value)
      },
      get: function () {
        return this.$store.state.taskList.perPage
      }
    },
    testOwner: {
      set: function (val) {
        console.log('set', val)
        return 'set'
      },
      get: function (val) {
        console.log('get', val)
        return 'get'
      }
    },
    searchQuery: {
      set: function (value) {
        console.log('set query', value)
        this.$store.dispatch('tasks/setSearchQuery', value)
      },
      get: function () {
        return this.$store.state.taskList.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('tasks/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.taskList.currentPage
      }
    }
  },
  methods: {

    changeField(value, IDF) {
      console.log('changeField', value, IDF)
      this.$store.commit('taskList/SET_FIELD', {
        value,
        IDF
      })
    },
    addReward(IDF) {
      this.$store.commit('tasks/ADD_REWARD', IDF)
    },

  },
  mounted() {
    this.$store.dispatch('taskList/getAll')
  }

}
</script>

<style scoped>
.stat-row {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.stat-row-item {
  margin: 0 5px;
}

.m-5px {
  margin: 5px;
}

.jc-center {
  justify-content: center;
}

.stat-item {
  width: 60px;
}
</style>
