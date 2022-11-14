<template>
  <div>
    <AddMatch/>
    <b-card no-body class="mb-0">
      <!--      <button @click="sort">sort</button>    -->
      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Показать</label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="$store.state.matchList.perPageOptions"
                      :clearable="false" class="per-page-selector d-inline-block mx-50"/>
            <label>записей</label>
          </b-col>
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <b-button variant="primary"  v-b-modal.modal-3 size="sm">Добавить матч</b-button>
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

      <b-table ref="refUserListTable" class="position-relative" :items="$store.state.matchList.arraySorted" responsive
               :fields="$store.state.matchList.fields"
               primary-key="id" show-empty empty-text="No matching records found"
      >

        <!--  Column: ID-->
        <template #cell(id)="data">

          <b-media vertical-align="center">
            <b-form-input
                v-if="data.item.isEdit"
                v-bind:value="data.item.id"
                v-on:change="changeField($event,{id:data.item._id,field:`id`})"/>
            <small v-else class="font-weight-bold d-block text-nowrap">{{ data.item.id }}</small>
          </b-media>

        </template>


        <template #cell(game)="data">

          <b-media vertical-align="center">
            <b-form-input
                v-if="data.item.isEdit"
                v-bind:value="data.item.game"
                v-on:change="changeField($event,{id:data.item._id,field:`game`})"/>
            <small v-else class="font-weight-bold d-block text-nowrap">{{ data.item.game }}</small>
          </b-media>

        </template>

        <template #cell(show_details)="row">

          <b-media vertical-align="center">
          <b-button variant="primary" size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Скрыть' : 'Показать' }} детали
          </b-button>
          </b-media>
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
              <template #cell(command)="member">
                <b-media sm="3" v-if="row.item.isEdit" vertical-align="center">
                  <b-dropdown text="Выбрать команду">
                    <b-dropdown-item>
                        <span @click="changeField('command1',{id:row.item._id,field:`members.${member.index}.command`})"
                              class="align-middle ml-50">Команда 1(CT)</span>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <span @click="changeField('command2',{id:row.item._id,field:`members.${member.index}.command`})"
                              class="align-middle ml-50">Команда 2(T)</span>
                    </b-dropdown-item>

                  </b-dropdown>
                </b-media>

                <b-media v-else vertical-align="center">
                  <small class="font-weight-bold d-block text-nowrap">{{ member.item.command }}</small>
                </b-media>


              </template>

              <template #cell(statistic)="member">
                <div class="stat-row">
                  <div class="stat-row-item">Kills:</div>
                  <div v-if="row.item.isEdit" class="stat-row-item">
                    <b-form-input class="stat-row-item stat-item"
                                  :value="member.item.statistic.kills"
                                  @change="changeField($event,{id:row.item._id,field:`members.${member.index}.statistic.kills`, member:member})"
                                  placeholder="Amount"></b-form-input>
                  </div>
                  <div v-else class="stat-row-item">{{ member.item.statistic.kills }}</div>

                </div>
                <div class="stat-row">
                  <div class="stat-row-item">Deaths:</div>
                  <div v-if="row.item.isEdit" class="stat-row-item">
                    <b-form-input class="stat-row-item stat-item"
                                  :value="member.item.statistic.deaths"
                                  @change="changeField($event,{id:row.item._id,field:`members.${member.index}.statistic.deaths`})"
                                  placeholder="Amount"></b-form-input>
                  </div>
                  <div v-else class="stat-row-item">{{ member.item.statistic.deaths }}</div>

                </div>
                <div class="stat-row">
                  <div class="stat-row-item">Assists:</div>
                  <div v-if="row.item.isEdit" class="stat-row-item">
                    <b-form-input class="stat-row-item stat-item"
                                  :value="member.item.statistic.assists"
                                  @change="changeField($event,{id:row.item._id,field:`members.${member.index}.statistic.assists`})"
                                  placeholder="Amount"></b-form-input>
                  </div>
                  <div v-else class="stat-row-item">{{ member.item.statistic.assists }}</div>
                </div>
              </template>

            </b-table>
            <br>
            <div class="stat-row score-bl">
              <div class="stat-row-item m-5px">Command 1:</div>

              <b-form-input v-if="row.item.isEdit" class="stat-row-item stat-item"
                            :value="row.item.score.command1"
                            @change="changeField($event,{id:row.item._id,field:`score.command1`})"
                            placeholder="Amount"></b-form-input>
              <div v-else class="stat-row-item m-5px"><b>{{ row.item.score.command1 }}</b></div>
              <div class="stat-row-item m-5px">Command 2:</div>

              <b-form-input v-if="row.item.isEdit" class="stat-row-item stat-item"
                            :value="row.item.score.command2"
                            @change="changeField($event,{id:row.item._id,field:`score.command2`})"
                            placeholder="Amount"></b-form-input>
              <div v-else class="stat-row-item m-5px"><b>{{ row.item.score.command2 }}</b></div>
              <div class="stat-row-item m-5px">Map name:</div>

              <b-form-input v-if="row.item.isEdit" class="stat-row-item stat-item"
                            :value="row.item.score.mapName"
                            @change="changeField($event,{id:row.item._id,field:`score.mapName`})"
                            placeholder="Amount"></b-form-input>
              <div v-else class="stat-row-item m-5px"><b>{{ row.item.score.mapName }}</b></div>
            </div>
            <br>
            <div class="stat-row">
              <div class="stat-row-item m-5px jc-center">
                <b-button variant="primary" size="sm" @click="row.toggleDetails">Скрыть детали</b-button>
              </div>
              <div class="stat-row-item m-5px jc-center">
<!--                <b-button variant="primary" size="sm" v-b-modal.modal-1>Добавить member</b-button>-->
                <AddMember :id="row.item._id" />
              </div>
              <div class="stat-row-item m-5px jc-center">
                <b-button variant="primary" v-if="row.item.isEdit" size="sm" @click="$store.dispatch('matchList/save', row.item._id)">
                  Сохранить
                </b-button>
                <b-button variant="primary" v-else size="sm" @click="$store.commit('matchList/EDIT', row.item._id)">Редактировать
                </b-button>

              </div>
              <div class="stat-row-item m-5px jc-center">

<!--                <b-button variant="primary" size="sm" v-b-modal.modal-2>Добавить изображение</b-button>-->
                <b-modal id="modal-2" title="Добавить изображение">
                  <div>
                    <div>
                      <b-form-file v-model="file" class="mt-3" plain></b-form-file>
                      <div class="mt-3">Выбранный файл: {{ file ? file.name : '' }}</div>
                    </div>
                  </div>

                </b-modal>
              </div>
              <div class="stat-row-item m-5px jc-center">
                <b-button variant="primary" size="sm" @click="$store.dispatch('matchList/getAll')">Отмена</b-button>
              </div>
            </div>

          </b-card>

        </template>


      </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span>
            {{ $store.state.matchList.array.length}}
                          записей</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="$store.state.matchList.array.length" :per-page="perPage"
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
import AddMatch from '@/pages/components/AddMatch.vue'
import AddMember from '@/pages/components/AddMember.vue'
export default {
  name: "MatchListPage",
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
    BFormSelect,
    AddMatch,
    AddMember
  },
  data() {
    return {
      testOwner2: '',
      file: null
    }
  },
  computed: {
    perPage: {
      set: function (value) {
        this.$store.dispatch('matchList/setPerPage', value)
      },
      get: function () {
        return this.$store.state.matchList.perPage
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
        this.$store.dispatch('matchList/setSearchQuery', value)
      },
      get: function () {
        return this.$store.state.matchList.searchQuery
      }
    },
    currentPage: {
      set: function (page) {
        this.$store.dispatch('matchList/setCurrentPage', page)
      },
      get: function () {
        return this.$store.state.matchList.currentPage
      }
    }
  },
  methods: {
    addImage() {
      console.log('this.file', this.file)
      console.log('this.file', this.file)
      console.log('this.file buffer', this.file.arrayBuffer())
    },
    changeField(value, IDF) {
      console.log('changeField', value, IDF)
      this.$store.commit('matchList/SET_FIELD', {
        value,
        IDF
      })
    },
    onSubmit(event) {
      event.preventDefault()
    },
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

.score-bl {

}

</style>
