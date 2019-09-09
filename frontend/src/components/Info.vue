<template>
<div>
  <q-dialog v-model="opened">
    <div class="flex flex-center">
     <q-btn color="primary" @click="Print" label="Imprimir" />
  </div>
    <q-card style="min-width: 500px" id="printMe">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{ driver.name }}</q-toolbar-title>
      </q-toolbar>
      <q-markup-table>
        <thead>
          <tr>
            <th>Sponser</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dat in data.sponsers" :key="dat.id">
            <td>{{ dat.sponser }}</td>
            <td class="text-right">
              <p v-if="data.definite">{{ format(dat.price) }}</p>
              <p v-else>{{ format(dat.price) + ' / km' }}</p></td>
            <td class="text-right">{{ format(dat.total) }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total a Pagar</td>
            <td></td>
            <td class="text-right">{{ '$ ' + format(data.total) }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total Manejado</td>
            <td></td>
            <td class="text-right">{{ data.total_km + ' KM' }}</td>
          </tr>
          <tr class="text-bold">
            <td>Total Precio Fijo</td>
            <td></td>
            <td  class="text-right" v-if="data.definite > 0">{{ '$ ' + format(data.definite) }}</td>
            <td  class="text-right" v-else>$ 0.00</td>
          </tr>
          <tr class="text-bold">
            <td>Total Precio por KM</td>
            <td></td>
            <td class="text-right">{{ '$ ' + format(data.price_x_km) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </q-dialog>
  </div>
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
  methods: {
    format(val) {
      let sum = 0
      if (val > 0) {
        sum = val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      }
      return sum
    },
    Print() {
      this.$htmlToPaper('printMe');
    }
  },
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
