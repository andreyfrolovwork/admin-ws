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
                      :options="$store.state.tasks.perPageOptions"
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.tasks.usersSorted" responsive
               :fields="$store.state.tasks.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

        <!--  Column: ID-->
        <template #cell(_id)="data">

          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item._id }}</small>
          </b-media>

        </template>


        <template #cell(owner)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input v-bind:value="data.item.owner"
                          v-on:change="changeField($event,{id:data.item._id,field:'owner'})"></b-form-input>
          </b-media>

          <b-media v-else="data.item.isEdit" vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.owner }}</small>
          </b-media>

        </template>


        <template #cell(name)="data">

          <b-media v-if="data.item.isEdit" vertical-align="center">
            <b-form-input :value="data.item.name" @change="changeField($event,{id:data.item._id,field:'name'})"
                          placeholder="Name"></b-form-input>
          </b-media>

          <b-media v-else vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.name }}</small>
          </b-media>

        </template>


        <template #cell(show_details)="row">

          <b-button variant="primary" size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Скрыть' : 'Показать' }} детали
          </b-button>

        </template>


        <template #row-details="row">

          <b-card>

            <b-row v-if="row.item.isEdit" class="mb-2">
              <b-col sm="2" class="text-sm-right"><b>Flags:</b></b-col>
              <b-col class="t-rewards">
                <div class="t-rewards-item">Complete:</div>
                <div class="t-rewards-item">
                  <div v-if="row.item.isEdit">
                    {{ row.item.flags.complete }}
                    <b-dropdown variant="link" no-caret>

                      <template #button-content>
                        <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
                      </template>
                      <b-dropdown-item>
                        <span @click="changeField(true,{id:row.item._id,field:'flags.complete'})"
                              class="align-middle ml-50">true</span>
                      </b-dropdown-item>
                      <b-dropdown-item>
                        <span @click="changeField(false,{id:row.item._id,field:'flags.complete'})"
                              class="align-middle ml-50">false</span>
                      </b-dropdown-item>

                    </b-dropdown>
                  </div>
                </div>
              </b-col>
              <b-col class="t-rewards">
                <div class="t-rewards-item">Static</div>
                <div class="t-rewards-item">
                  <div v-if="row.item.isEdit">
                    {{ row.item.flags.static }}

                    <b-dropdown variant="link" no-caret>
                      <template #button-content>
                        <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
                      </template>
                      <b-dropdown-item>
                        <span @click="changeField(true,{id:row.item._id,field:'flags.static'})"
                              class="align-middle ml-50">true</span>
                      </b-dropdown-item>
                      <b-dropdown-item>
                        <span @click="changeField(false,{id:row.item._id,field:'flags.static'})"
                              class="align-middle ml-50">false</span>
                      </b-dropdown-item>

                    </b-dropdown>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row v-else class="mb-2">
              <b-col sm="2" class="text-sm-right"><b>Flags:</b></b-col>
              <b-col class="t-rewards">
                <div class="t-rewards-item">Complete:</div>
                <div class="t-rewards-item"><b>{{ row.item.flags.complete }}</b></div>
              </b-col>
              <b-col class="t-rewards">
                <div class="t-rewards-item">Static:</div>
                <div class="t-rewards-item"> <b>{{ row.item.flags.static }}</b></div>
              </b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="2" class="text-sm-right"><b>Progress:</b></b-col>
              <b-col>
                <div v-if="row.item.isEdit" class="t-rewards">
                  <div class="t-rewards-item">Current points:</div>
                  <b-form-input class="t-rewards-item"
                                :value="row.item.progress.currentPoints"
                                @change="changeField($event,{id:row.item._id,field:'progress.currentPoints'})"
                                placeholder="Amount"></b-form-input>
                  <div class="t-rewards-item">Required points:</div>
                  <b-form-input class="t-rewards-item"
                                :value="row.item.progress.requiredPoints"
                                @change="changeField($event,{id:row.item._id,field:'progress.requiredPoints'})"
                                placeholder="Type"></b-form-input>
                </div>
                <b-progress v-else :value="row.item.progress.currentPoints"
                            :max="row.item.progress.requiredPoints"
                            show-progress animated></b-progress>
              </b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="2" class="text-sm-right"><b>Rewards:</b></b-col>
              <b-col>
                <ul>
                  <b-list-group v-for="(reward,i) in row.item.rewards">
                    <b-list-group-item class="t-rewards m-5px fc" v-if="row.item.isEdit">
                      <div class="t-rewards-item">Amount:</div>
                      <b-form-input class="t-rewards-item"
                                    :value="reward.amount"
                                    @change="changeField($event,{id:row.item._id,field:`rewards.${i}.amount`})"
                                    placeholder="Amount"></b-form-input>
                      <div class="t-rewards-item">Type:</div>
                      <b-form-input class="t-rewards-item"
                                    :value="reward.type"
                                    @change="changeField($event,{id:row.item._id,field:`rewards.${i}.type`})"
                                    placeholder="Type"></b-form-input>
                    </b-list-group-item>
                    <b-list-group-item class="m-5px fc" v-else>Amount: <b>{{ reward.amount }}</b> Type:
                      <b>{{ reward.type }}</b>
                    </b-list-group-item>
                  </b-list-group>
                  <div class="m-5px " v-if="row.item.isEdit">
                    <b-button variant="primary" @click="addReward({id:row.item._id})">Add reward</b-button>
                  </div>


                </ul>
              </b-col>
            </b-row>

            <b-col sm="2" class="text-sm-right"><b>Expiration:</b></b-col>

            <b-col>

              <div class="t-rewards" v-if="row.item.isEdit">
                <b-form-input class="t-rewards-item fc"
                              :value="row.item.expires.expirationType"
                              @change="changeField($event,{id:row.item._id,field:'expires.expirationType'})"
                              placeholder="Expiration yype"></b-form-input>
                <div class="t-rewards-item">
                  <b-form-datepicker
                      :value="new Date(row.item.expires.expirationDate)"
                      @input="changeField($event,{id:row.item._id,field:'expires.expirationDate'})"
                      locale="ru"/>
                </div>
              </div>

              <div class="t-rewards" v-else>
                <div class="t-rewards-item">{{ row.item.expires.expirationType }}</div>
                <div class="t-rewards-item">
                  <b-form-datepicker :disabled="true" :value="new Date(row.item.expires.expirationDate)"
                                     locale="ru"/>
                </div>
              </div>

            </b-col>

            <b-row class="mb-2">

            </b-row>

            <div class="t-rewards">
              <div class="t-rewards-item">
                <b-button variant="primary" size="sm" @click="row.toggleDetails">Скрыть детали</b-button>
              </div>
              <div class="t-rewards-item">
                <b-button variant="primary" v-if="row.item.isEdit" size="sm" @click="$store.dispatch('tasks/saveTask', row.item._id)">
                  Сохранить
                </b-button>
                <b-button variant="primary" v-else size="sm" @click="$store.commit('tasks/EDIT_TASK', row.item._id)">Редактировать</b-button>

              </div>
              <div class="t-rewards-item">
                <b-button variant="primary" size="sm" @click="$store.dispatch('tasks/getAllTasks')">Отмена</b-button>
              </div>
            </div>


          </b-card>
        </template>

        <!--
                <template #cell(name)="data">
                  <div class="text-nowrap">
                    <span class="align-text-top text-capitalize">{{ data.item.name }}</span>
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


                <template #cell(Действия)="data">
                  <b-dropdown variant="link" no-caret>

                    <template #button-content>
                      <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body"/>
                    </template>
                    <b-dropdown-item>
                      <feather-icon icon="FileTextIcon"/>
                      <span class="align-middle ml-50">Информация</span>
                    </b-dropdown-item>

                  </b-dropdown>
                </template>-->

      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Показано {{ $store.state.tasks.from }} до {{ $store.state.tasks.to }} из {{
                            $store.state.tasks.usersArray.length
                          }}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.tasks.usersArray.length" :per-page="perPage"
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
    BFormDatepicker
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
        return this.$store.state.tasks.perPage
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
        return this.$store.state.tasks.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('tasks/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.tasks.currentPage
      }
    }
  },
  methods: {
    setDate(value, IDF) {
      console.log(value, IDF)
    },
    changeField(value, IDF) {
      console.log('changeField', value, IDF)
      this.$store.commit('tasks/SET_FIELD', {
        value,
        IDF
      })
    },
    addReward(IDF) {
      this.$store.commit('tasks/ADD_REWARD', IDF)
    },
    /*   changeFlags(value, IDF) {
         console.log('changeName', value, IDF)
         this.$store.commit('tasks/SET_FIELD_FLAGS', {
           value,
           IDF
         })
       },*/

    /*    deleteTask(id) {
          this.$store.dispatch('tasks/deleteTask', id)
        },
        editTask(id) {
          console.log(id)
          this.$store.commit("tasks/EDIT_TASK", id)
        }*/
  },
  mounted() {
    this.$store.dispatch('tasks/getAllTasks')
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
