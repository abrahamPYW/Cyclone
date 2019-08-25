<template>
  <q-page>
    <div class="text-center q-pt-xl" style="padding-top: 5%">
      <i class="q-pa-md q-gutter-md text-primary">
        <i class="text-h3">Sponsers:</i>
        <i class="text-h3 text-bold">{{ expected.sonponsers }}</i>
      </i>
      <div class="q-pa-md q-gutter-md text-primary">
        <i class="text-h3">Total:</i>
        <i class="text-h3 text-bold">{{ expected.definite | currency }}</i>
      </div>
      <i class="q-pa-md q-gutter-md text-primary">
        <i class="text-h3">Km:</i>
        <i class="text-h3 text-bold">{{ expected.Km | currency }}</i>
      </i>
    </div>
    <q-separator style="margin-top: 10%" />
    <div class="text-center q-pt-xl" style="padding-top: 5%">
      <div class="q-pa-md q-gutter-md text-primary">
        <i class="text-h3">Total:</i>
        <i class="text-h3 text-bold">{{ data.Total | currency }}</i>
      </div>
      <div class="q-pa-md q-gutter-md text-primary">
        <i class="text-h3">Km:</i>
        <i class="text-h3 text-bold">{{ data.Km }}</i>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Axios from "axios";
export default {
  name: "PageHome",
  data: () => ({
    data: {},
    expected: {}
  }),
  filters: {
    currency(value) {
      return "$ " + value;
    }
  },
  created() {
    Axios.get("http://localhost:8000/total/").then(res => {
      this.data = res.data;
    });
    Axios.get("http://localhost:8000/expected/").then(res => {
      this.expected = res.data;
    });
  }
};
</script>
