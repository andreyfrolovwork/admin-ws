<template>
  <b-modal id="modal-4"
           title="Добавить матч"
           @ok="addPrefix"
           ref="my-modal-prefix"
  >
    <div>
      <div>
        <b-form >
          <b-form-group
              id="input-group-1"
              label="Prefix:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.prefix"
                type="text"
                placeholder="Введите prefix"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validPrefix">
              prefix не должен быть пустым
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validPrefix">
              Отлично, идем дальше.
            </b-form-valid-feedback>
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
        prefix:'',
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
    validPrefix() {
      return this.form.prefix !== ""
    },
  },
  methods: {
    addPrefix() {
      this.$refs['my-modal-prefix'].hide()
      this.$store.dispatch('users/addPrefix', prefix)
      console.log(this.form)
    },
  }
}
</script>

<style scoped>

</style>
