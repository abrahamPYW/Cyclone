<template>
  <q-dialog v-model="opened">
    <q-card>
      Hello
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    opened: false
  }),
  created() {
    this.$root.$on("Info", obj => {
      this.opened = true
    })
  }
}
</script>
