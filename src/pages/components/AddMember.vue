<template>
  <b-modal id="modal-1" title="Добавить member" @ok="addMember">
    <div>
      <div>
        <b-form >
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
            <b-form-invalid-feedback :state="validation">
              Name не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Команда:" label-for="input-2">
            <b-dropdown text="Выбрать команду" v-model="form.command">
              <b-dropdown-item>
                        <span @click="form.command = 'command1'"
                              class="align-middle ml-50">Команда 1(CT)</span>
              </b-dropdown-item>
              <b-dropdown-item>
                        <span @click="form.command = 'command2'"
                              class="align-middle ml-50">Команда 2(T)</span>
              </b-dropdown-item>

            </b-dropdown>
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
        </b-form>
      </div>
    </div>

  </b-modal>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BFormValidFeedback, BModal,
  BDropdownItem,BDropdown
} from "bootstrap-vue"

export default {
  name: "AddMember",
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
  props: ['id'],
  computed: {
    validation() {
      return this.form.name !== ""
    }
  },
  data() {
    return {
      testOwner2: '',
      form: {
        name: '',
        command: 'command1',
        kills: 0,
        deaths: 0,
        assists: 0,
        checked: []
      },

    }
  },
  methods: {
    addMember() {
      console.log(this.form)
      this.$bvModal.hide('my-modal-1')
      this.$store.dispatch('matchList/addMember', {
        form: this.form,
        _id: this.id
      })
    },
  }
}
</script>

<style scoped>

</style>
