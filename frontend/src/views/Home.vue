<template>
  <q-page class="text-center q-pt-xl" style="padding-top: 25%">
    <div class="q-pa-md q-gutter-md text-primary">
      <i class="text-h3">Total:</i><i class="text-h3 text-bold">{{ data.Total | currency }}</i>
    </div>
     <div class="q-pa-md q-gutter-md text-primary">
      <i class="text-h3">Km:</i><i class="text-h3 text-bold">{{ data.Km }}</i>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Axios from 'axios'
export default {
  name: 'PageHome',
  data: () => ({
    data: {}
  }),
  filters: {
    currency(value) {
      return '$ ' + value
    }
  },
  created() {
    Axios.get("http://localhost:8000/total/").then(res => {
      this.data = res.data
    })
  }
}
</script>
