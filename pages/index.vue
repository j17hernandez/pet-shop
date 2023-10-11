<template>
  <v-container justify="center" align="center">
    <ListaProductos />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import ListaProductos from '@/components/listaProductos.vue'
export default {
  name: 'IndexPage',
  components: {
    ListaProductos,
  },
  computed: {
    ...mapState(['isLogged']),
    isUserLogged() {
      return this.isLogged
    },
  },
  mounted() {
    if (!this.isUserLogged) this.$router.push('/login')
  },
}
</script>
<style>
.product__rating .v-icon {
  padding: 0px !important;
}
</style>
