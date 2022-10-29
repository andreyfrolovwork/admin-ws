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
                      :options="$store.state.matchList.perPageOptions"
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.matchList.arraySorted" responsive
               :fields="$store.state.matchList.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

        <!--  Column: ID-->
        <template #cell(id)="data">

          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.id }}</small>
          </b-media>

        </template>


        <template #cell(game)="data">

          <b-media vertical-align="center">
            <small class="font-weight-bold d-block text-nowrap">{{ data.item.game }}</small>
          </b-media>

        </template>

        <template #cell(show_details)="row">

          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Скрыть' : 'Показать' }} детали
          </b-button>

        </template>


        <template #row-details="row">

          <b-card>
            <b-table striped hover :items="row.item.members">

              <template #cell(name)="member">
                <b-media sm="3" v-if="row.item.isEdit" vertical-align="center">
                  <b-form-input
                      v-bind:value="member.item.name"
                      v-on:change="changeField($event,{id:row.item._id,field:`members.${member.index}.name`})"/>
                </b-media>

                <b-media v-else vertical-align="center">
                  <small class="font-weight-bold d-block text-nowrap">{{ member.item.name }}</small>
                </b-media>


              </template>


              <template #cell(statistic)="member">
                <div class="stat-row">
                  <div class="stat-row-item">Kills:</div>
                  <div v-if="row.item.isEdit" class="stat-row-item">
                    <b-form-input  class="stat-row-item stat-item"
                                  :value="member.item.statistic.kills"
                                  @change="changeField($event,{id:row.item._id,field:`members.${member.index}.statistic.kills`, member:member})"
                                  placeholder="Amount"></b-form-input>
                  </div>
                  <div v-else class="stat-row-item">{{ member.item.statistic.kills }}</div>

                </div>
                <div class="stat-row">
                  <div class="stat-row-item">Deaths:</div>
                  <div v-if="row.item.isEdit" class="stat-row-item">
                    <b-form-input  class="stat-row-item stat-item"
                                  :value="member.item.statistic.deaths"
                                  @change="changeField($event,{id:row.item._id,field:`members.${member.index}.statistic.deaths`})"
                                  placeholder="Amount"></b-form-input>
                  </div>
                  <div v-else class="stat-row-item">{{ member.item.statistic.deaths }}</div>

                </div>
                <div class="stat-row">
                  <div class="stat-row-item">Assists:</div>
                  <div v-if="row.item.isEdit"  class="stat-row-item">
                    <b-form-input class="stat-row-item stat-item"
                                  :value="member.item.statistic.assists"
                                  @change="changeField($event,{id:row.item._id,field:`members.${member.index}.statistic.assists`})"
                                  placeholder="Amount"></b-form-input>
                  </div>
                  <div v-else class="stat-row-item">{{ member.item.statistic.assists }}</div>
                </div>
              </template>

            </b-table>

           <div class="stat-row">
             <div class="stat-row-item m-5px">Command 1:</div>
             <div class="stat-row-item m-5px"><b>{{row.item.score.command1}}</b></div>
             <div class="stat-row-item m-5px">Command 2:</div>
             <div class="stat-row-item m-5px"><b>{{row.item.score.command2}}</b></div>
             <div class="stat-row-item m-5px">Map name:</div>
             <div class="stat-row-item m-5px"><b>{{row.item.score.mapName}}</b></div>
           </div>

            <div class="stat-row">
              <div class="stat-row-item m-5px jc-center">
                <b-button size="sm" @click="row.toggleDetails">Скрыть детали</b-button>
              </div>
              <div class="stat-row-item m-5px jc-center">
                <b-button size="sm" v-b-modal.modal-1>Добавить member</b-button>
                <b-modal id="modal-1" title="Добавить member">
                  <div>
                    <div>
                      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group
                            id="input-group-1"
                            label="Имя:"
                            label-for="input-1"
                        >
                          <b-form-input
                              id="input-1"
                              v-model="form.name"
                              type="text"
                              placeholder="Введите имя"
                              required
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Команда:" label-for="input-2">
                          <b-form-input
                              id="input-2"
                              v-model="form.command"
                              placeholder="Введите команду"
                              required
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="deaths:" label-for="input-2">
                          <b-form-input
                              id="input-2"
                              v-model="form.kills"
                              placeholder="Введите количество deaths"
                              required
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Kills:" label-for="input-2">
                          <b-form-input
                              id="input-2"
                              v-model="form.deaths"
                              placeholder="Введите количество kills"
                              required
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Assist:" label-for="input-2">
                          <b-form-input
                              id="input-2"
                              v-model="form.assists"
                              placeholder="Введите количество assists"
                              required
                          ></b-form-input>
                        </b-form-group>

                        <b-button type="submit" variant="primary" @click="$store.dispatch('matchList/addMember',{
                          form,
                          _id:row.item._id
                        })">Submit</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button>
                      </b-form>
                    </div>
                  </div>

                </b-modal>
              </div>
              <div class="stat-row-item m-5px jc-center">
                <b-button v-if="row.item.isEdit" size="sm" @click="$store.dispatch('matchList/save', row.item._id)">
                  Сохранить
                </b-button>
                <b-button v-else size="sm" @click="$store.commit('matchList/EDIT', row.item._id)">Редактировать
                </b-button>

              </div>
              <div class="stat-row-item m-5px jc-center">
                <b-button size="sm" @click="$store.dispatch('tasks/getAllTasks')">Отмена</b-button>
              </div>
            </div>

          </b-card>

        </template>


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
  BBadge, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BProgress, BListGroupItem, BListGroup, BFormDatepicker,
    BModal,
    BForm,
    BFormGroup,
    BFormCheckboxGroup,
    BFormSelect
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
    BFormDatepicker,
    BModal,
    BForm,
    BFormGroup,
    BFormCheckboxGroup,
    BFormSelect
  },
  data() {
    return {
      testOwner2: '',
      form: {
        name : '',
        command : '',
        kills : 0,
        deaths : 0,
        assists : 0,
        checked: []
      },
      show: true
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

    changeField(value, IDF) {
      console.log('changeField', value, IDF)
      this.$store.commit('matchList/SET_FIELD', {
        value,
        IDF
      })
    },
    addReward(IDF) {
      this.$store.commit('tasks/ADD_REWARD', IDF)
    },
    onSubmit(event) {
      event.preventDefault()
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.command = ''
      this.form.kills = 0
      this.form.deaths = 0
      this.form.assists = 0
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  mounted() {
    this.$store.dispatch('matchList/getAll')
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
