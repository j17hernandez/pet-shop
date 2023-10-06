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
            @click="$router.push(item.path)"
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
          <v-badge class="mr-4" color="green" :content="getCountCart">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <ListCart show-pay-button />
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
      groupSelected: 0,
      menu: [
        {
          id: 1,
          title: 'Home',
          icon: 'mdi-view-dashboard',
          path: '/',
        },
        {
          id: 2,
          title: 'Settings',
          icon: 'mdi-cog',
          path: '/settings',
        },
        {
          id: 3,
          title: 'Admin',
          icon: 'mdi-shield-account',
          path: '/admin',
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
<style scoped>
.menu_cart {
  border-radius: 30px 0px 30px 30px;
}
</style>
