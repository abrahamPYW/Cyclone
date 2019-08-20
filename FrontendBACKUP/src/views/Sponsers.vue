<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row q-gutter-md">
        <div class="col">
          <q-select
            use-input
            clearable
            option-value="id"
            option-label="name"
            label="Participante"
            :options="Participants"
            @filter="filter_Participants"
            :error="$v.form.participant.$error"
            error-message="Favor de introducir el nombre del Participante"
            bottom-slots
            v-model="form.participant"
          />
        </div>
        <div class="col">
          <q-input
            :error="$v.form.$error"
            error-message="Favor de introducir el nombre del Patrocinador"
            bottom-slots
            v-model="form.name"
            label="Nombre Patrocinador"
          />
        </div>
        <div class="col-2">
          <q-input 
            :error="$v.form.maximum.$error"
            error-message="Favor de introducir el maximo que el Patrocinador desea pagar!"
            bottom-slots
            v-model="form.maximum" label="Maximo" />
        </div>
      </div>
      <div class="row q-gutter-md">
        <div class="col">
          <q-input 
            :error="$v.form.from_km.$error"
            error-message="Favor de introducir el km de Partida"
            bottom-slots
            v-model="form.from_km" label="Desde el Km:" />
        </div>
        <div class="col">
          <q-input 
            :error="$v.form.to_km.$error"
            error-message="Favor de introducir el km de llegada"
            bottom-slots
            v-model="form.to_km" label="Hasta el Km" />
        </div>
        <div class="col">
          <q-input 
            :error="$v.form.price.$error"
            error-message="Favor de introducir el Precio"
            bottom-slots
            v-model="form.price" label="Precio" />
        </div>
        <div class="col q-pt-md text-center">
          <q-checkbox v-model="form.definite" true-value="True" false-value="False" label="Precio Fijo?" />
        </div>
        <div class="col q-pt-md text-center">
          <q-btn round flat color="positive" icon="fas fa-save" @click="Add" />
        </div>
      </div>
      <div class="q-pt-md">
        <q-separator />
        <q-table
          title="Patrocinios Registrados"
          :data="Sponsers"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :pagination="{rowsPerPage: 500}"
        >
          <q-tr slot="body" slot-scope="props" :props="props" class="text-center">
            <q-td key="id" class="text-center">{{ props.row.id }}</q-td>
            <q-td key="name" class="text-center">{{ props.row.name }}</q-td>
            <q-td key="participant" class="text-center">{{ props.row.participant }}</q-td>
            <q-td key="from" class="text-center">{{ props.row.from_km }}</q-td>
            <q-td key="too" class="text-center">{{ props.row.to_km }}</q-td>
            <q-td key="price" class="text-center">{{ props.row.price }}</q-td>
            <q-td key="maximum" class="text-center">{{ props.row.maximum }}</q-td>
            <q-td key="definite" class="text-center" v-if="props.row.definite == 1">Fijo</q-td>
            <q-td key="definite" class="text-center" v-else >Normal</q-td>
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
      </div>
    </div>
  </q-page>
</template>
      
<script>
// Imports
import Axios from "axios";

// Validators
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    form: {},
    filter: "",
    Participants: [],
    Participantss: [],
    Sponsers: [],
    columns: [
      {
        name: "id",
        field: "id",
        label: "#",
        align: "center"
      },
      {
        name: "name",
        field: "name",
        label: "Nombre",
        align: "center"
      },
      {
        name: "participant",
        field: "participant",
        label: "Participante",
        align: "center"
      },
      {
        name: "too",
        field: "to_km",
        label: "Desde",
        align: "center"
      },
      {
        name: "from",
        field: "from_km",
        label: "Hasta",
        align: "center"
      },
      {
        name: "price",
        label: "Precio",
        field: "price",
        align: "center"
      },
      {
        name: "maximum",
        label: "Maximo",
        field: "maximum",
        align: "center"
      },
      {
        name: "definite",
        label: "Tipo",
        field: "definite",
        align: "center"
      },
      {
        name: "delete",
        field: "id",
        label: "",
        align: "center"
      }
    ]
  }),
  validations: {
    // Validators
    form: {
      name: { required },
      participant: { required },
      maximum: { required },
      to_km: { required },
      from_km: { required },
      price: { required }
    }
  },
  methods: {
    form_Defaults() {
      this.form = {
        definite: "False",
        maximum: 99999
      };
    },
    GET_Participants() {
      Axios.get("http://localhost:8000/participants/").then(res => {
        this.Participants = res.data;
        this.Participantss = res.data;
      });
    },
    GET_Sponsers() {
      Axios.get("http://localhost:8000/sponsers/").then(res => {
        this.Sponsers = res.data;
      });
    },
    filter_Participants(val, update) {
      if (val === "") {
        update(() => {
          this.Participants = this.Participantss;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.Participants = this.GET_Participantss.filter(
          obj => obj.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    Add() {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        this.$q.notify({
          message: "Favor de llenar todos los campos obligatorios",
          color: "negative"
        });
        return;
      }
      this.form.participant = this.form.participant.id;
      Axios.post("http://localhost:8000/sponsers/", this.form).then(res => {
        this.GET_Sponsers();
        this.form_Defaults();
        this.$v.form.$reset();
      });
    },
    Delete(sponser) {
        this.$q.dialog({
            title: "Eliminar Patrocinio",
            message: "Desea eliminar el Patrocinio: " + sponser.id,
            color: "negative",
            ok: "Eliminar",
            cancel: "Cancelar"
        })
        .onOk(res => {
            Axios.delete("http://localhost:8000/sponsers/" + sponser.id + "/")
            .then(res => {
                this.GET_Sponsers()
            })
        })
    }
  },
  created() {
    this.form_Defaults();
    this.GET_Participants();
    this.GET_Sponsers();
  }
};
</script>