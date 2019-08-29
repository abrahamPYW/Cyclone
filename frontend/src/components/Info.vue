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
          <tr v-for="dat in data.sponsers" :key="dat.id">
            <td>{{ dat.sponser }}</td>
            <td class="text-right">{{ dat.total }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total a Pagar</td>
            <td class="text-right">{{ '$ ' + data.total }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total Manejado</td>
            <td class="text-right">{{ data.total_km + ' KM' }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total Precio Fijo</td>
            <td  class="text-right" v-if="data.definite > 0">{{ data.definite }}</td>
            <td  class="text-right" v-else>$ 0.00</td>
          </tr>
          <tr class="text-bold">
            <td>Total Precio por KM</td>
            <td class="text-right">{{ '$ ' + data.price_x_km }}</td>
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
