<template>
  <v-container>
    <LoadingComponent v-if="isLoading" />
    <v-breadcrumbs v-if="!isLoading" :items="items" />
    <v-row>
      <v-col
        v-for="item in itemsPerPages"
        :key="item.name"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <CardComponent :item="item" />
      </v-col>
    </v-row>
    <v-col
      v-if="itemsPerPages.length == 0"
      class="d-flex justify-center"
      cols="12"
      sm="12"
      md="12"
    >
      <v-img
        max-height="600px"
        :src="require('assets/img/emptyList.png')"
        max-width="600px"
      />
    </v-col>
    <v-col v-if="itemsPerPages.length !== 0" class="mt-5">
      <v-pagination v-model="currentPage" :length="totalPages" />
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
      items: [
        {
          text: 'Home',
          disabled: true,
          href: '#',
        },
        {
          text: 'Productos veterinarios',
          disabled: false,
          href: '#',
        },
      ],
      itemsPerPage: 5,
      currentPage: 1,
    }
  },
  computed: {
    // Función computada para obtener los resultados de la busqueda
    getFilterProducts() {
      let products = []
      if (
        this.$store.state.search !== null &&
        this.$store.state.search.length > 0
      ) {
        products = this.products.filter((item) =>
          item.name
            .toLowerCase()
            .includes(this.$store.state.search.toLowerCase())
        )
      } else {
        products = this.products
      }

      return products
    },
    totalPages() {
      return Math.ceil(this.getFilterProducts.length / this.itemsPerPage)
    },
    itemsPerPages() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.getFilterProducts.slice(start, end)
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
