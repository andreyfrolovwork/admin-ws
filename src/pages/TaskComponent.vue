<template>
  <div>task:{{}}
    <b-card v-if="task.isLoaded">
      id:{{ task.id }}
      isLoaded:{{ task.isLoaded }}
    </b-card>
    <b-card v-else>
      <b-row v-if="task.isEdit" class="mb-2">
        <b-col sm="2" class="text-sm-right"><b>Flags:</b></b-col>
        <b-col class="t-rewards">
          <div class="t-rewards-item">Complete:</div>
          <div class="t-rewards-item">
            <div v-if="task.isEdit">
              {{ task.flags.complete }}
              <b-dropdown variant="link" no-caret>

                <template #button-content>
                  <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
                </template>
                <b-dropdown-item>
                        <span @click="changeField(true,{id:task._id,field:'flags.complete'})"
                              class="align-middle ml-50">true</span>
                </b-dropdown-item>
                <b-dropdown-item>
                        <span @click="changeField(false,{id:task._id,field:'flags.complete'})"
                              class="align-middle ml-50">false</span>
                </b-dropdown-item>

              </b-dropdown>
            </div>
          </div>
        </b-col>
        <b-col class="t-rewards">
          <div class="t-rewards-item">Static</div>
          <div class="t-rewards-item">
            <div v-if="task.isEdit">
              {{ task.flags.static }}

              <b-dropdown variant="link" no-caret>
                <template #button-content>
                  <feather-icon icon="EditIcon" size="16" class="align-middle text-body"/>
                </template>
                <b-dropdown-item>
                        <span @click="changeField(true,{id:task._id,field:'flags.static'})"
                              class="align-middle ml-50">true</span>
                </b-dropdown-item>
                <b-dropdown-item>
                        <span @click="changeField(false,{id:task._id,field:'flags.static'})"
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
          <div class="t-rewards-item"><b>{{ task.flags.complete }}</b></div>
        </b-col>
        <b-col class="t-rewards">
          <div class="t-rewards-item">Static:</div>
          <div class="t-rewards-item"><b>{{ task.flags.static }}</b></div>
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col sm="2" class="text-sm-right"><b>Progress:</b></b-col>
        <b-col>
          <div v-if="task.isEdit" class="t-rewards">
            <div class="t-rewards-item">Current points:</div>
            <b-form-input class="t-rewards-item"
                          :value="task.progress.currentPoints"
                          @change="changeField($event,{id:task._id,field:'progress.currentPoints'})"
                          placeholder="Amount"></b-form-input>
            <div class="t-rewards-item">Required points:</div>
            <b-form-input class="t-rewards-item"
                          :value="task.progress.requiredPoints"
                          @change="changeField($event,{id:task._id,field:'progress.requiredPoints'})"
                          placeholder="Type"></b-form-input>
          </div>
          <b-progress v-else :value="task.progress.currentPoints"
                      :max="task.progress.requiredPoints"
                      show-progress animated></b-progress>
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col sm="2" class="text-sm-right"><b>Rewards:</b></b-col>
        <b-col>
          <ul>
            <b-list-group v-for="(reward,i) in task.rewards">
              <b-list-group-item class="t-rewards m-5px fc" v-if="task.isEdit">
                <div class="t-rewards-item">Amount:</div>
                <b-form-input class="t-rewards-item"
                              :value="reward.amount"
                              @change="changeField($event,{id:task._id,field:`rewards.${i}.amount`})"
                              placeholder="Amount"></b-form-input>
                <div class="t-rewards-item">Type:</div>
                <b-form-input class="t-rewards-item"
                              :value="reward.type"
                              @change="changeField($event,{id:task._id,field:`rewards.${i}.type`})"
                              placeholder="Type"></b-form-input>
              </b-list-group-item>
              <b-list-group-item class="m-5px fc" v-else>Amount: <b>{{ reward.amount }}</b> Type:
                <b>{{ reward.type }}</b>
              </b-list-group-item>
            </b-list-group>
            <div class="m-5px " v-if="task.isEdit">
              <b-button variant="primary" @click="addReward({id:task._id})">Add reward</b-button>
            </div>


          </ul>
        </b-col>
      </b-row>

      <b-col sm="2" class="text-sm-right"><b>Expiration:</b></b-col>

      <b-col>

        <div class="t-rewards" v-if="task.isEdit">
          <b-form-input class="t-rewards-item fc"
                        :value="task.expires.expirationType"
                        @change="changeField($event,{id:task._id,field:'expires.expirationType'})"
                        placeholder="Expiration yype"></b-form-input>
          <div class="t-rewards-item">
            <b-form-datepicker
                :value="new Date(task.expires.expirationDate)"
                @input="changeField($event,{id:task._id,field:'expires.expirationDate'})"
                locale="ru"/>
          </div>
        </div>

        <div class="t-rewards" v-else>
          <div class="t-rewards-item">{{ task.expires.expirationType }}</div>
          <div class="t-rewards-item">
            <b-form-datepicker :disabled="true" :value="new Date(task.expires.expirationDate)"
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
          <b-button variant="primary" v-if="task.isEdit" size="sm" @click="$store.dispatch('tasks/saveTask', task._id)">
            Сохранить
          </b-button>
          <b-button variant="primary" v-else size="sm" @click="$store.commit('tasks/EDIT_TASK', task._id)">Редактировать</b-button>

        </div>
        <div class="t-rewards-item">
          <b-button variant="primary" size="sm" @click="$store.dispatch('tasks/getAllTasks')">Отмена</b-button>
        </div>
      </div>

    </b-card>

  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BProgress, BListGroupItem, BListGroup, BFormDatepicker
} from 'bootstrap-vue'

export default {
  name: "TaskComponent",
  components: {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BFormCheckbox, BProgress, BListGroupItem, BListGroup, BFormDatepicker
  },
  props: ['task'],
  setup() {
    this._vw.e
  },
}
</script>

<style scoped>

</style>
