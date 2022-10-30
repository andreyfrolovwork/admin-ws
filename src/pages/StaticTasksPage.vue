<template>
  <div>
    <AddStaticTask/>
    <b-card no-body class="mb-0">
      <!--      <button @click="sort">sort</button>    -->
      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Показать</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="$store.state.staticTasks.perPageOptions"
                      :clearable="false" class="per-page-selector d-inline-block mx-50"/>
            <label>записей</label>
          </b-col>
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <b-button v-b-modal.modal-add-static-task size="sm">Добавить static task</b-button>
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.staticTasks.arraySorted" responsive
               :fields="$store.state.staticTasks.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

        <!--  Column: ID-->
        <template #cell(id)="data">

          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item._id }}</small>
          </b-media>

        </template>


        <template #cell(name)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input v-bind:value="data.item.name"
                          v-on:change="changeField($event,{id:data.item._id,field:'name'})"></b-form-input>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.name }}</small>
          </b-media>

        </template>


        <template #cell(points)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input :value="data.item.points" @change="changeField($event,{id:data.item._id,field:'points'})"
                          placeholder="points"></b-form-input>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.points }}</small>
          </b-media>

        </template>

        <template #cell(expirationType)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-dropdown text="Выбрать expType">
              <b-dropdown-item @click="changeField('hour',{id:data.item._id,field:'expirationType'})">
                <span class="align-middle ml-50">hour</span>
              </b-dropdown-item>
              <b-dropdown-item @click="changeField('day',{id:data.item._id,field:'expirationType'})">
                <span class="align-middle ml-50">day</span>
              </b-dropdown-item>
              <b-dropdown-item @click="changeField('week',{id:data.item._id,field:'expirationType'})">
                <span class="align-middle ml-50">week</span>
              </b-dropdown-item>
              <b-dropdown-item @click="changeField('year',{id:data.item._id,field:'expirationType'})">
                <span class="align-middle ml-50">year</span>
              </b-dropdown-item>

            </b-dropdown>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.expirationType }}</small>
          </b-media>

        </template>

        <template #cell(reward-mp)="data">
          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input v-if="data.item.reward && data.item.reward.mp" :value="data.item.reward.mp"
                          @change="changeField($event,{id:data.item._id,field:'reward.mp'})"
                          placeholder="xp"></b-form-input>
            <b-form-input v-else
                          @change="changeField($event,{id:data.item._id,field:'reward.mp'})"
                          placeholder="xp"></b-form-input>
          </b-media>

          <div v-if="data.item.reward !== undefined">
            <b-media v-if="!data.item.isEdit" vertical-align="center">
              <small v-if="data.item.reward.mp === undefined"
                     class="font-weight-bold d-block text-nowrap">Пусто</small>
              <small v-else class="font-weight-bold d-block text-nowrap">{{ data.item.reward.mp }}</small>
            </b-media>
          </div>
        </template>

        <template #cell(reward-exp)="data">
          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input v-if="data.item.reward && data.item.reward.exp" :value="data.item.reward.exp"
                          @change="changeField($event,{id:data.item._id,field:'reward.exp'})"
                          placeholder="xp"></b-form-input>
            <b-form-input v-else
                          @change="changeField($event,{id:data.item._id,field:'reward.exp'})"
                          placeholder="xp"></b-form-input>
          </b-media>

          <div v-if="data.item.reward !== undefined">
            <b-media v-if="!data.item.isEdit" vertical-align="center">
              <small v-if="data.item.reward.exp === undefined"
                     class="font-weight-bold d-block text-nowrap">Пусто</small>
              <small v-else class="font-weight-bold d-block text-nowrap">{{ data.item.reward.exp }}</small>
            </b-media>
          </div>
        </template>

        <template #cell(actions)="data">
          <b-button v-if="data.item.isEdit" @click="$store.dispatch('staticTasks/save', data.item._id)" size="sm m-5px">
            Сохранить
          </b-button>
          <b-button v-if="data.item.isEdit" @click="$store.commit('staticTasks/EDIT',data.item._id)" size="sm m-5px">
            Отмена
          </b-button>
          <b-dropdown v-else variant="link" no-caret>
            <template #button-content>
              <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
            </template>
            <b-dropdown-item>
              <span @click="$store.commit('staticTasks/EDIT',data.item._id)"
                    class="align-middle ml-50">Редактировать</span>
            </b-dropdown-item>

          </b-dropdown>
        </template>


      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Показано {{
                            $store.state.staticTasks.from
                          }} до {{ $store.state.staticTasks.to }} из {{
                            $store.state.staticTasks.array.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.staticTasks.array.length" :per-page="perPage"
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

import AddStaticTask from '@/pages/components/AddStaticTask.vue'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BProgress, BListGroupItem, BListGroup, BFormDatepicker
} from 'bootstrap-vue'
import vSelect from "vue-select"

export default {
  name: "StaticTasksPage",
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
    AddStaticTask
  },
  computed: {
    perPage: {
      set: function (value) {
        this.$store.dispatch('staticTasks/setPerPage', value)
      },
      get: function () {
        return this.$store.state.staticTasks.perPage
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
        this.$store.dispatch('staticTasks/setSearchQuery', value)
      },
      get: function () {
        return this.$store.state.staticTasks.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('staticTasks/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.staticTasks.currentPage
      }
    }
  },
  methods: {
    setDate(value, IDF) {
      console.log(value, IDF)
    },
    changeField(value, IDF) {
      console.log('changeField', value, IDF)
      this.$store.commit('staticTasks/SET_FIELD', {
        value,
        IDF
      })
    },
    addReward(IDF) {
      this.$store.commit('staticTasks/ADD_REWARD', IDF)
    },
  },
  mounted() {
    this.$store.dispatch('staticTasks/getAll')
  }

}
</script>

<style scoped>
.t-rewards {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.t-rewards-item {
  margin: 0 5px;
}

.m-5px {
  margin: 5px;
}

.fc {
  width: fit-content;
}
</style>
