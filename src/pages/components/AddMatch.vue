<template>
  <b-modal id="modal-3"
           title="Добавить матч"
           @ok="addMatch"
           ref="my-modal"
  >
    <div>
      <div>
        <b-form >
          <b-form-group
              id="input-group-1"
              label="Id:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.id"
                type="text"
                placeholder="Введите id"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">
              Id не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Игра:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.game"
                placeholder="Введите game"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">
              Game не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Отлично, идем дальше.
            </b-form-valid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2" label="Очки для Команды 1(СT)" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.command1"
                placeholder="Введите количество очков для Команды 1(CT)"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Очки для Команды 2(T):" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.command2"
                placeholder="Введите количество очков для Команды 2(T)"
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
  BFormInput,
  BButton,
  BModal,
  BForm,
  BFormGroup,
  BFormValidFeedback,
  BFormInvalidFeedback

} from 'bootstrap-vue'

export default {
  name: "AddMatch",
  components: {
    BFormInput,
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormValidFeedback,
    BFormInvalidFeedback
  },
  props: ['isShow'],
  data() {
    return {
      testOwner2: '',
      form: {
        id: '',
        game: '',
        mapName: 0,
        command1: 0,
        command2: 0,
        checked: []
      },
      file: null,
    }
  },
  computed: {
    validation() {
      return this.form.id !== "" && this.form.game !== ""
    }
  },
  methods: {
    addMatch() {
      this.$refs['my-modal'].hide()
      this.$store.dispatch('matchList/addMatch',this.form)
      console.log(this.form)
    },
  }
}
</script>

<style scoped>

</style>
