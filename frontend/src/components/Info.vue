<template>
  <q-dialog v-model="opened">
    <q-card style="min-width: 500px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{ driver.name }}</q-toolbar-title>
      </q-toolbar>
      <q-markup-table>
        <thead>
          <tr>
            <th>Sponser</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dat in data" :key="dat.id">
            <td>{{ dat.sponser }}</td>
            <td>{{ dat.total }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </q-dialog>
</template>

<script>
// Imports
import Axios from 'axios'
export default {
  data: () => ({
    opened: false,
    data: [],
    driver: {}
  }),
  created() {
    this.$root.$on("Info", obj => {
      this.opened = true
      Axios.get('http://localhost:8000/info/?id=' + obj.id).then(res => {
        this.data = res.data
        this.driver = obj
      })
    })
  }
}
</script>
