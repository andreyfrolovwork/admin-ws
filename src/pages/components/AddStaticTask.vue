<template>
  <b-modal id="modal-add-static-task" title="Добавить static task" @ok="add">
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
              label="Points:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.points"
                type="text"
                placeholder="Введите points"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="vPoints">
              Points не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="vPoints">
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
    BDropdown
  },
  computed: {
    vName() {
      return this.form.name !== ""
    },
    vPoints() {
      return this.form.points !== ""
    },
    vExp() {
      return this.form.expirationType !== ""
    }
  },
  data() {
    return {
      form: {
        name: '',
        points: '',
        expirationType: '',
        mp: '',
        exp: '',
      },

    }
  },
  methods: {
    add() {
      console.log(this.form)
      this.$bvModal.hide('modal-add-static-task')
      this.$store.dispatch('staticTasks/add', {
        form: this.form,
        _id: this.id
      })
    },
  }
}
</script>

<style scoped>

</style>
