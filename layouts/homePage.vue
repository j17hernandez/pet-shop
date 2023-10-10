<template>
  <v-app dark>
    <v-overlay v-model="overlay"></v-overlay>
    <v-app-bar :clipped-left="clipped" fixed app color="primary darken-2" dark>
      <nuxt-link to="/">
        <v-avatar height="110" min-width="110" rounded="0">
          <v-img
            :src="require('assets/img/logo.png')"
            height="70"
            width="70"
            style="background-color: transparent"
            contain
            alt="logo"
          ></v-img>
        </v-avatar>
      </nuxt-link>
      <v-spacer />
      <v-card class="tabsCards" style="background-color: transparent;">
        <v-tabs v-model="groupSelected" align-tabs="center">
          <v-tab 
            v-for="item in menu"
            :key="item.id"
            class="Tabs"
            @click="$router.push(item.path)"
          >
            <v-list-item-icon class="mt-3">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 4" :key="n" value="n">      
          </v-window-item>
        </v-window>
      </v-card>
      <v-spacer />
      <div class="mt-6 mr-4">
        <v-text-field
          v-model="search"
          label="Search"
          dense
          outlined
          prepend-inner-icon="mdi-magnify"
          clearable
        />
      </div>
      <v-menu
        offset-y
        :close-on-content-click="false"
        content-class="menu_cart"
      >
        <template #activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on" @click="overlay = !overlay">
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-dialog
            v-model="dialog"
            persistent
            width="1024"
        >
        </v-dialog>  
        </template>
        <LoginPage show-save-button/>      
      </v-menu>      
    </v-app-bar>
    <v-main>
      <v-container >
        <ListaProductosHome/>
      </v-container>
    </v-main>
    <v-footer fixed app class="text-center">
      <span
        >By <a href="#">PetShop Team</a> &copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import LoginPage from '@/components/loginUser.vue'
import ListaProductosHome from '@/components/listaProductosHome.vue'
// import listaServicios from '@/components/listaServicios.vue'
export default {
  name: 'HomePage',
  components: {
    LoginPage,
    ListaProductosHome,
    // listaServicios,
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      search: '',
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Pet Shop',
      groupSelected: 0,
      tab: null,
      overlay: false,
      dialog: false,
      menu: [
      {
          id: 1,
          title: 'Mascotas',
          icon: 'mdi-view-dashboard',
          path: '/petsPage',
        },
        {
          id: 2,
          title: 'Marcas',
          icon: 'mdi-cog',
          path: '/marcas_page',
        },
        {
          id: 3,
          title: 'Servicios',
          icon: 'mdi-shield-account',
          path: '/servicios_page',
        },       
      ],
    }
  },
  computed: {
    ...mapState(['countCart']),
    getCountCart() {
      const count = this.countCart.toString()
      return count
    },
  },
  watch: {
    search: {
      handler(v) {
        this.$store.commit('setSearch', v)
      },
      deep: true,
    },
  },
}
</script>

<style>

.theme--dark.v-tabs, .theme--dark.v-tabs > .v-tabs-bar {
  font-family: 'Poppins', sans-serif;
  background-color: transparent;
}

.v-tab{
  text-transform: uppercase;
} 

</style>