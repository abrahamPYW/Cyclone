<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <q-scroll-area class="fit">
          <q-table
            title="Participantes Registrados"
            :data="Participants"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :pagination="{rowsPerPage: 500}"
          >
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="id">{{ props.row.id }}</q-td>
              <q-td key="name"> {{ props.row.name }} </q-td>
              <q-td key="info"><q-btn round dense flat color="info" icon="fas fa-info" @click="Info(props.row)" /></q-td>
              <q-td key="edit"><q-btn round dense flat color="primary" icon="fas fa-edit" @click="form = props.row" /></q-td>
              <q-td key="delete"><q-btn round dense flat color="negative" icon="fas fa-trash" @click="Delete(props.row)" /></q-td>
            </q-tr>
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="fas fa-search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </q-scroll-area>
      </div>
      <q-separator vertical style="min-height: 80vh" />
      <div class="col q-pa-lg">
        <div class="text-h4 text-primary text-left text-bold">Agregar Participante:</div>
        <div class="q-pa-xl">
          <q-input
            error-message="Campo Obligatorio"
            bottom-slots
            :error="$v.form.name.$error"
            v-model="form.name"
            label="Nombre del Participante"
          />
        </div>
        <div class="text-center q-gutter-md">
          <q-btn color="negative" v-if="form.id" @click="form_Default" round icon="fas fa-times" />
          <q-btn color="positive" :disable="$v.form.$error" @click="Add" round icon="fas fa-save" />
        </div>
      </div>
    </div>
    <dialog-info />
  </q-page>
</template>
<script>
// Imports
import Axios from "axios";

// Validators
import { required } from "vuelidate/lib/validators";

// Components
import DialogInfo from '../components/Info.vue'

export default {
  name: "PageAbout",
  components: {
    DialogInfo
  },
  data: () => ({
    form: {},
    Participants: [],
    columns: [],
    filter: ""
  }),
  validations: {
    form: {
      name: { required }
    }
  },
  methods: {
    form_Default() {
      this.form = {
        name: ""
      };
      this.columns = [
        {
          name: "id",
          field: "id",
          label: "Numero"
        },
        {
          name: "name",
          field: "name",
          label: "Nombre"
        },
        {
          name: "info",
          field: "info",
          label: "info"
        },
        {
          name: "edit",
          field: "edit",
          label: ""
        },
        {
          name: "delete",
          field: "delete",
          label: ""
        }
      ];
    },
    Add() {
      // Adding a new Participant to backend

      if (this.form.id) {
        this.Edit(this.form)
        return
      }

      // Calling Validators
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          color: "negative",
          message: "Favor de llenar todos los campos obligatorios"
        });
        return;
      }

      // Calling Backend
      Axios.post("http://localhost:8000/participants/", this.form).then(res => {
        this.$q.notify({
          color: "positive",
          message: "Se agrego Exitosamente!"
        });
        this.$v.form.$reset();
        this.form_Default();
        this.Get();
      });
    },
    Get() {
      Axios.get("http://localhost:8000/participants/").then(res => {
        this.Participants = res.data;
      });
    },
    Delete(Participant) {
      this.$q.dialog({
        title: "Eliminar",
        ok: "Eliminar",
        cancel: "Cancelar",
        message: "Desea eliminar al participante:" + Participant.name + ' ?',
        color: "negative"
      })
      .onOk(res => {
        Axios.delete("http://localhost:8000/participants/" + Participant.id + '/')
        .then(res => {
          this.$q.notify({color: "positive", message: "Se elimino exitosamente!"})
          this.Get()
        })
      })
    },
    Edit(Participant) {
      Axios.patch("http://localhost:8000/participants/" + Participant.id + '/', Participant)
        .then(res => {
          this.$q.notify({color: "positive", message: "Se edito exitosamente!"})
          this.form_Default()
          this.$v.form.$reset()
          this.Get()
        })
    },
    Info(Participant) {
      this.$root.$emit("Info", Participant)
    } 
  },
  created() {
    this.form_Default();
    this.Get();
  }
};
</script>
