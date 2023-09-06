<template>
  <v-container>
    <LoadingComponent v-if="isLoading" />
    <v-row v-if="getProductos.length !== 0 && getSearch.length === 0">
      <v-col
        v-for="item in getProductos"
        :key="item.name"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <CardComponent :item="item" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(el, ind) in getSearch"
        :key="ind"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <div v-if="getSearch.length > 0">
          <CardComponent :item="el" />
        </div>
      </v-col>
    </v-row>
    <v-col
      v-if="getProductos.length == 0"
      class="mt-1"
      cols="12"
      sm="12"
      md="12"
    >
      <v-img :src="require('assets/img/emptyList.png')"></v-img>
    </v-col>
  </v-container>
</template>
<script>
import LoadingComponent from './loading.vue'
import CardComponent from '@/components/cardProducto.vue'
export default {
  name: 'ListaProductos',
  components: {
    CardComponent,
    LoadingComponent,
  },
  data() {
    return {
      products: [],
      isLoading: false,
    }
  },
  computed: {
    getProductos() {
      return this.products
    },
    // Función computada para obtener los resultados de la busqueda
    getSearch() {
      let products = []
      if (
        this.$store.state.search !== null &&
        this.$store.state.search.length > 0
      ) {
        products = this.products.filter((item) =>
          item.name.toLowerCase().includes(this.$store.state.search)
        )
      }
      return products
    },
  },
  created() {
    this.isLoading = true
    this.getListProducts()
  },
  methods: {
    // Función que devuelve la lista de productos, desde la API
    getListProducts() {
      this.$axios
        .get('/api/480984b1-8abe-4b3e-b83f-edaac4d27fff')
        .then((resp) => {
          this.products = resp.data.data
          this.isLoading = false
        })
    },
  },
}
</script>
