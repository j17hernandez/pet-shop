<template>
  <v-app dark>
        <v-navigation-drawer 
          v-model="drawer"
          :mini-variant="miniVariant"
          :clipped="clipped"
          fixed
          app
          color="primary darken-2"
          width="200"    
        >
          <nuxt-link to="/">
              <v-avatar height="64" min-width="150" rounded="0" >
                  <v-img
                    :src="require('assets/img/logo.png')"
                    height="40"
                    width="40"
                    class="ml-10"
                    style="background-color: white;"
                    contain
                    alt="logo"
                  ></v-img>
              </v-avatar>
            </nuxt-link>

        <v-divider></v-divider>

            <v-list color="transparent">
              <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
              <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
              <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
            </v-list>

        </v-navigation-drawer>
        



    <v-app-bar :clipped-left="clipped" fixed app color="primary darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
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
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-badge class="mr-4" color="green" :content="getCountCart">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <v-card width="500px">
          <v-card-text>
            <ListCart />
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed app >
      <span
        >By <a href="#">PetShop Team</a> &copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ListCart from '@/components/listaCarrito.vue'
export default {
  name: 'DefaultLayout',
  components: {
    ListCart,
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
