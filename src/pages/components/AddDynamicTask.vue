<template>
  <b-modal id="modal-add-dynamic-task" title="Добавить dynamic task" @ok="add">
    <div>
      <div>
        <b-form>
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
            <b-form-invalid-feedback :state="vName">
              Name не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="vName">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Min Points:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.minPoints"
                type="text"
                placeholder="Введите minPoints"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="vMinPoints">
              minPoints не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="vMinPoints">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Max Points:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.maxPoints"
                type="text"
                placeholder="Введите points"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="vMaxPoints">
              maxPoints не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="vMaxPoints">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Step for points:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.stepForPoints"
                type="text"
                placeholder="Введите stepForPoints"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="vStepForPoints">
              stepForPoints не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="vStepForPoints">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Команда:" label-for="input-2">
            <b-dropdown text="Выбрать команду" v-model="form.expirationType">
              <b-dropdown-item @click="form.expirationType = 'hour'">
                <span class="align-middle ml-50">hour</span>
              </b-dropdown-item>
              <b-dropdown-item @click="form.expirationType = 'day'">
                <span class="align-middle ml-50">day</span>
              </b-dropdown-item>
              <b-dropdown-item @click="form.expirationType = 'week'">
                <span class="align-middle ml-50">week</span>
              </b-dropdown-item>
              <b-dropdown-item @click="form.expirationType = 'year'">
                <span class="align-middle ml-50">year</span>
              </b-dropdown-item>
            </b-dropdown>
            <b-form-invalid-feedback :state="vExp">
              expirationType не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="vExp">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="deaths:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.mp"
                placeholder="Введите количество reward mp"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Kills:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.exp"
                placeholder="Введите количество reward exp"
                required
            ></b-form-input>
          </b-form-group>
          <div>{{ form }}</div>
        </b-form>
      </div>
    </div>

  </b-modal>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BFormValidFeedback, BModal,
  BDropdownItem, BDropdown
} from "bootstrap-vue"
import AddDynamicTask from '@/pages/components/AddDynamicTask.vue'
export default {
  name: "AddStaticTask",
  components: {
    BFormInput,
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BDropdownItem,
    BDropdown,
    AddDynamicTask
  },
  computed: {
    vName() {
      return this.form.name !== ""
    },
    vMinPoints() {
      return this.form.minPoints !== ""
    },
    vMaxPoints() {
      return this.form.maxPoints !== ""
    },
    vStepForPoints() {
      return this.form.stepForPoints !== ""
    },
    vExp() {
      return this.form.expirationType !== ""
    }
  },
  data() {
    return {
      form: {
        name: '',
        minPoints: '',
        maxPoints: '',
        stepForPoints: '',
        expirationType: '',
        mp: '',
        exp: '',
      },

    }
  },
  methods: {
    add() {
      console.log(this.form)
      this.$bvModal.hide('modal-add-dynamic-task')
      this.$store.dispatch('dynamicTasks/add', {
        form: this.form,
        _id: this.id
      })
    },
  }
}
</script>

<style scoped>

</style>
