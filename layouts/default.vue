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
      dark
    >
      <nuxt-link to="/">
        <v-avatar height="160" min-width="150" rounded="0">
          <v-img
            :src="require('assets/img/logo.png')"
            height="160"
            width="160"
            class="ml-6"
            style="background-color: transparent"
            contain
            alt="logo"
          ></v-img>
        </v-avatar>
      </nuxt-link>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group v-model="groupSelected">
          <v-list-item
            v-for="item in menu"
            :key="item.id"
            @click="item.path !== '' ? $router.push(item.path) : item.click()"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app color="primary darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div class="mt-6 mr-4">
        <v-text-field
          v-model="search"
          label="Buscar..."
          dense
          outlined
          prepend-inner-icon="mdi-magnify"
          clearable
        />
      </div>
      <v-menu
        v-model="isOpenCartList"
        offset-y
        :close-on-content-click="false"
        content-class="menu_cart"
      >
        <template #activator="{ on, attrs }">
          <v-badge class="mr-4" color="green" :content="getCountCart">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <ListCart show-pay-button :close="close" />
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed app>
      <span
        >By <a href="#">PetShop Team</a> &copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      groupSelected: 0,
      menu: [
        {
          id: 1,
          title: 'Inicio',
          icon: 'mdi-view-dashboard',
          path: '/',
        },
        {
          id: 2,
          title: 'Cerrar Sesión',
          icon: 'mdi-logout',
          path: '',
          click: () => {
            this.changeStatusLoged(false)
            this.$router.push('/login')
          },
        },
      ],
      isOpenCartList: false,
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
  methods: {
    ...mapActions(['changeStatusLoged']),
    close() {
      this.isOpenCartList = false
    },
  },
}
</script>
<style scoped>
.menu_cart {
  border-radius: 30px 0px 30px 30px;
}
</style>
