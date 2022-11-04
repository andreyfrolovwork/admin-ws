<template>
  <div>
    <AddDynamicTask/>
    <b-card no-body class="mb-0">
      <!--      <button @click="sort">sort</button>    -->
      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Показать</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="$store.state.dynamicTasks.perPageOptions"
                      :clearable="false" class="per-page-selector d-inline-block mx-50"/>
            <label>записей</label>
          </b-col>
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <b-button variant="primary" v-b-modal.modal-add-dynamic-task size="sm">Добавить dynamic task</b-button>
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.dynamicTasks.arraySorted" responsive
               :fields="$store.state.dynamicTasks.fields"
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


        <template #cell(minPoints)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input :value="data.item.minPoints" @change="changeField($event,{id:data.item._id,field:'minPoints'})"
                          placeholder="points"></b-form-input>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.minPoints }}</small>
          </b-media>

        </template>
        <template #cell(maxPoints)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input :value="data.item.maxPoints" @change="changeField($event,{id:data.item._id,field:'maxPoints'})"
                          placeholder="points"></b-form-input>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.maxPoints }}</small>
          </b-media>

        </template>

        <template #cell(stepForPoints)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input :value="data.item.stepForPoints" @change="changeField($event,{id:data.item._id,field:'stepForPoints'})"
                          placeholder="points"></b-form-input>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.stepForPoints }}</small>
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
          <b-button variant="primary" v-if="data.item.isEdit" @click="$store.dispatch('dynamicTasks/save', data.item._id)" size="sm m-5px">
            Сохранить
          </b-button>
          <b-button variant="primary" v-if="data.item.isEdit" @click="$store.commit('dynamicTasks/EDIT',data.item._id)" size="sm m-5px">
            Отмена
          </b-button>
          <b-dropdown v-else variant="link" no-caret>
            <template #button-content>
              <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
            </template>
            <b-dropdown-item>
              <span @click="$store.commit('dynamicTasks/EDIT',data.item._id)"
                    class="align-middle ml-50">Редактировать</span>
            </b-dropdown-item>

          </b-dropdown>
        </template>


      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted"> Показано {{
                            $store.state.dynamicTasks.from
                          }} до {{ $store.state.dynamicTasks.to }} из {{
                            $store.state.dynamicTasks.array.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.dynamicTasks.array.length" :per-page="perPage"
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

import AddDynamicTask from '@/pages/components/AddDynamicTask.vue'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BProgress, BListGroupItem, BListGroup, BFormDatepicker
} from 'bootstrap-vue'
import vSelect from "vue-select"

export default {
  name: "dynamicTasksPage",
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
    AddDynamicTask
  },
  computed: {
    perPage: {
      set: function (value) {
        this.$store.dispatch('dynamicTasks/setPerPage', value)
      },
      get: function () {
        return this.$store.state.dynamicTasks.perPage
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
        this.$store.dispatch('dynamicTasks/setSearchQuery', value)
      },
      get: function () {
        return this.$store.state.dynamicTasks.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('dynamicTasks/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.dynamicTasks.currentPage
      }
    }
  },
  methods: {
    setDate(value, IDF) {
      console.log(value, IDF)
    },
    changeField(value, IDF) {
      console.log('changeField', value, IDF)
      this.$store.commit('dynamicTasks/SET_FIELD', {
        value,
        IDF
      })
    },
    addReward(IDF) {
      this.$store.commit('dynamicTasks/ADD_REWARD', IDF)
    },
  },
  mounted() {
    this.$store.dispatch('dynamicTasks/getAll')
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
