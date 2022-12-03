<template>
  <b-modal id="modal-5"
           title="Добавить изображение"
           @ok="addImage"
           ref="my-modal"
  >
    <div>
      <div>
        <b-form>
          <b-form-file v-model="file" class="mt-3" plain></b-form-file>
          <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
        </b-form>
      </div>
    </div>

  </b-modal>

</template>

<script>
import config from "@/config.js"
import {

  BButton,
  BModal,
  BForm,
  BFormFile,

} from 'bootstrap-vue'
import axios from 'axios'

export default {
  name: "AddImage",
  components: {
    BButton,
    BModal,
    BFormFile,
    BForm,
  },
  props: ['isShow','model','modelId'],
  data() {
    return {
      file: null,
    }
  },

  methods: {
    addImage() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", 'Bearer ' + this.$store.state.appData.user.token);

      var formdata = new FormData();
      formdata.append("image",  this.file);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(config.url + "api/image/upload", requestOptions)
          .then(response => response.json())
          .then(res => {
              this.$store.dispatch("users/setImage",{
                model:this.model,
                modelId:this.modelId,
                imageId:res.id,
              })
            this.$refs['my-modal'].hide()
          })
          .catch(error => console.log('error', error));
    },
  }
}
</script>

<style scoped>

</style>
