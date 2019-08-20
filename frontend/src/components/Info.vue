<template>
  <q-dialog v-model="opened">
    <q-card>
      <q-toolbar>
        
      </q-toolbar>
      <div class="q-pa-lg">{{ data }}</div>
    </q-card>
  </q-dialog>
</template>

<script>
// Imports
import Axios from 'axios'
export default {
  data: () => ({
    opened: false,
    data: []
  }),
  created() {
    this.$root.$on("Info", obj => {
      this.opened = true
      Axios.get('http://localhost:8000/info/').then(res => {
        this.data = res.data
      })
    })
  }
}
</script>
