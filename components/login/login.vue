<template>
  <v-container class="text-center pt-0 main-login">
    <div class="mt-5 mb-5 d-none d-xl-flex"><br /><br /></div>
    <br />
    <v-card class="mx-auto px-5 py-5" outlined>
      <v-card-title class="d-block">
        <h1>Pet Shop</h1>
      </v-card-title>
      <br />
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              outlined
              label="Username"
              prepend-inner-icon="mdi-account"
            />
            <v-text-field
              v-model="password"
              autocomplete="off"
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-inner-icon="mdi-lock"
              :type="show1 ? 'text' : 'password'"
              outlined
              @click:append="show1 = !show1"
              @keypress.enter="login()"
            ></v-text-field>
          </v-form>
        </v-col>

        <v-col class="mb-5" lg="12" sm="12">
          <v-btn dark large color="primary" block @click="login()">
            Acceder
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GlobalMixin from '@/mixins/GlobalMixin'

export default {
  name: 'LoginComponent',
  mixins: [GlobalMixin],
  layout: 'login',
  data() {
    return {
      valid: false,
      show1: false,
      username: '',
      password: '',
      ex4: '',
    }
  },
  computed: {
    ...mapState(['isLogged']),
    isUserLogged() {
      return this.isLogged
    },
  },
  created() {
    if (this.isUserLogged) this.$router.push('/')
  },
  methods: {
    ...mapActions(['changeStatusLoged']),
    async login() {
      if (this.valid) {
        await this.fakeLogin()
      } else {
        this.$error('Los campos deben ser validos')
      }
    },
    fakeLogin() {
      try {
        let users = []
        users = JSON.parse(localStorage.getItem('usuarios'))
        const existUser = users.map(
          (user) =>
            user.username === this.username && user.password === this.password
        )
        if (existUser.includes(true)) {
          this.changeStatusLoged(true)
          return this.$router.push('/')
        } else {
          return this.$error('El usuario no existe')
        }
      } catch (error) {
        this.$error(`${error}`)
      }
    },
  },
}
</script>
