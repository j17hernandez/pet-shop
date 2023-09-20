<template>
  <v-container justify="center" align="center">
    <ListaProductos />
  </v-container>
</template>

<script>
import ListaProductos from '@/components/listaProductos.vue'
export default {
  name: 'IndexPage',
  components: {
    ListaProductos,
  },
}
</script>
<style>
.product__rating .v-icon {
  padding: 0px !important;
}
</style>
