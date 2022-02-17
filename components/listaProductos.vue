<template>
  <v-container>
    <LoadingComponent v-if="isLoading" />
    <h2>
      {{ category !== null && category !== undefined ? category.name : '' }}
    </h2>
    <v-row v-if="getSearch.length === 0">
      <v-col
        v-for="item in getProductos"
        :key="item.name"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <CardComponent :item="item" />
      </v-col>
      <v-col v-if="getProductos.length == 0" cols="12" sm="12" md="12">
        <v-img :src="require('assets/img/emptyList.png')"></v-img>
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
    category() {
      return this.$store.getters.getCategory
    },
    getProductos() {
      let products = []
      if (this.category !== null) {
        if (this.category.name === 'Todos') {
          products = this.products
        } else {
          products = this.products.filter(
            (item) => item.category.name === this.category.name
          )
        }
      }
      return products
    },
    // Función computada para obtener los resultados de la busqueda
    getSearch() {
      let products = []
      products = this.products.filter((item) =>
        item.name.toLowerCase().includes(this.$store.state.search)
      )
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
      this.$axios.get('product').then((resp) => {
        this.products = resp.data
        this.isLoading = false
      })
    },
  },
}
</script>
