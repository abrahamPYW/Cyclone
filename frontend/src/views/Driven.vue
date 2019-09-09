<template>
  <q-page>
      <div class="q-pl-md q-pt-md text-h5 text-bold text-primary">Registrar Resultados de Ciclistas</div>
      <div class="row q-pa-md q-gutter-sm">
        <div class="col">
          <q-select 
            label="Seleccione su Participante"
            :options="Participants"
            option-label="name"
            option-value="id"
            v-model="form.participant"
          />
        </div>
        <div class="col">
          <q-input 
            :error="$v.form.started.$error"
            error-message="Favor de especificar en que kilometro comezo el cilista"
            bottom-slots
            v-model="form.started"
            label="Desde el KM"
          />
        </div>
        <div class="col">
          <q-input 
            :error="$v.form.finished.$error"
            error-message="Favor de especificar en que kilometro termino el cilista"
            bottom-slots
            v-model="form.finished"
            label="Hasta el KM"
          />
        </div>
        <div class="col text-center q-pa-md">
          <q-btn 
          flat
          round
          color="positive"
          icon="fas fa-save"
          @click="Add"
          />
        </div>
      </div>
      <q-separator />
      <q-table
          title="Registros de Participantes"
          :data="Driven"
          :columns="columns"
          row-key="id"
        >
          <q-tr slot="body" slot-scope="props" :props="props" class="text-center">
            <q-td key="id" class="text-center">{{ props.row.id }}</q-td>
            <q-td key="participant" class="text-center">{{ props.row.participant_details.name }}</q-td>
            <q-td key="started" class="text-center">{{ props.row.started }}</q-td>
            <q-td key="finished" class="text-center">{{ props.row.finished }}</q-td>
            <q-td key="delete" class="text-center">
              <q-btn
                round
                dense
                flat
                color="negative"
                icon="fas fa-trash"
                @click="Delete(props.row)"
              />
            </q-td>
          </q-tr>
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="fas fa-search" />
              </template>
            </q-input>
          </template>
        </q-table>
  </q-page>
</template>

<script>
// Imports
import Axios from 'axios'

// Validators
import { required, numeric } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    form: {},
    Participants: [],
    Driven: [],
    filter: "",
    columns: [
      {
        name: "id",
        label: "Numero",
        field: "id",
        align: "center"
      },
      {
        name: "participant",
        label: "Participante",
        field: "participant",
        align: "center"
      },
      {
        name: "started",
        label: "Comienzo",
        field: "started",
        align: "center"
      },
      {
        name: "finished",
        label: "Final",
        field: "finished",
        align: "center"
      },
      {
        name: "delete",
        label: "",
        field: "id"
      }
    ]
  }),
  validations: {
    form: {
      participant: { required },
      started: { required },
      finished: { required }
    }
  },
  methods: {
    form_Defaults() {
      // Creando los Defaults para poder resetear el formulario
      this.form = {

      }
    },
    GET_Participantes() {
      Axios.get("http://localhost:8000/participants/")
        .then(res => {
          this.Participants = res.data
        })
    },
    GET_Driven() {
      // Calling Backend to retrieve all records of Driven
      Axios.get("http://localhost:8000/driven/")
        .then(res => {
          this.Driven = res.data
        })
    },
    Add() {
      // Calling Validators
      this.$v.form.$touch()

      // Checking Errors
      if (this.$v.form.$error) {
        this.$q.notify({
          message: "Favor de llenar todos los campos indicados!",
          color: "negative"
        })
        return
      }

      if (this.form.started == this.form.finished) {
        this.$q.notify({
          message: "La distancia es igual en ambos campos!",
          color: "negative"
        })
        return
      }

      if (this.form.started > this.form.finished) {
        this.$q.notify({
          message: "El comienzo tiene que ser menor al final!",
          color: "negative"
        })
        return
      }

      // Calling Backend to handle the request
      this.form.participant = this.form.participant.id
      Axios.post("http://localhost:8000/driven/", this.form)
        .then(res => {
          this.form_Defaults()
          this.$v.form.$reset()
          this.GET_Driven()
          this.$q.notify({
            message: "Se agrego exitosamente!"
          })
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: "Este registro ya se encuentra registrado!"
          })
          this.form_Defaults()
          this.$v.form.$reset()
        })

    },
    Delete(driven) {
      // Opning confirmation modal to warn user for Elimination
      this.$q.dialog({
        title: "Eliminar Registro",
        message: "Esta seguro que desea eliminar este registro? " + driven.id,
        ok: "Eliminar",
        cancel: "Cancelar",
        color: "negative"
      })
      .onOk(res => {
        // Calling Backend to Delete the especified Driven Record
        Axios.delete("http://localhost:8000/driven/" + driven.id + "/")
          .then(res => {
            this.GET_Driven()
            this.$q.notify({
              message: "Se elimino exitosamente el Registro: " + driven.id,
              color: "negative"
            })
          })
      })
    }
  },
  created() {
    this.GET_Participantes()
    this.GET_Driven()
  }
};
</script>

