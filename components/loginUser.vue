<template>
    <v-row justify="center">
      <v-dialog
            v-model="dialog"
            persistent
            width="1024"
        >
        <v-card>
          <v-card-title>
            <span class="text-h5">Registro</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Nombre"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="['Cédula', 'Tarjeta de extranjería']"
                    label="Tipo de documento*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="N° de documento*"
                    type="input"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Distrito Capital', 'Amazonas', 'Antioquia', 'Arauca', 'Atlantico', 'Bolivar', 'Boyacá', 'Caldas', 'Caquetá']"
                    label="Departamento"
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Dirección"
                    hint="Ejemplo: Villa palma 123 con avenida exito"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Datos obligatorios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              v-if="showSaveButton"
              color="blue-darken-1"
              variant="text"    
              @click="dialog = false && sendPay"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
<script>
export default {
name: 'LoginPage',
props: {
    showSaveButton: {
    type: Boolean,
    default: false,
    },
},
data: () => ({
    dialog: false,
}),
methods: {
    sendPay() {
    this.$router.push('/')
    },
},
}
</script>