<template>
  <b-card>

    <b-row>

      <!-- User Info: Left col -->
     

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Страна</span>
            </th>
            <td class="pb-50">
              {{ userData.country }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Регион</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.region }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Город</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.city }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Улица</span>
            </th>
            <td class="pb-50">
              {{ userData.street }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Дом</span>
            </th>
            <td class="pb-50">
              {{ userData.house }}
            </td>
          </tr>
          <tr>
            <th>
              <span class="font-weight-bold">Почтовый индекс</span>
            </th>
            <td>
              {{ userData.zip_code }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { resolveUserRoleVariant } = useUsersList()
    return {
      avatarText,
      resolveUserRoleVariant,
    }
  },
}
</script>

<style>

</style>
