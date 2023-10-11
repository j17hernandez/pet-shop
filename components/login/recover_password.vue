<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">Recuperar contraseña</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                outlined
                label="Nombre de usuario"
                prepend-inner-icon="mdi-account"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" dark @click="close()">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="recuperar()">Recuperar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      username: '',
      valid: false,
    }
  },
  methods: {
    close() {
      try {
        this.$refs.form.reset()
      } catch (error) {}
      this.username = ''
      this.dialog = false
    },
    recuperar() {
      if (this.valid) {
        console.log('recuperando...')
      }
    },
  },
}
</script>
