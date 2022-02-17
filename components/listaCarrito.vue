<template>
  <v-container>
    <v-row class="text-left">
      <v-col v-for="(item, i) in getItems" :key="i" cols="12">
        <v-row>
          <v-col>
            <h5>{{ item.name }}</h5>
            <span> {{ formatter.format(item.price) }} </span>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="item.cantidad"
              outlined
              dense
              append-outer-icon="mdi-plus"
              prepend-icon="mdi-minus"
              @click:prepend="updateCartMinus(item)"
              @click:append-outer="updateCart(item)"
            />
          </v-col>
          <v-col> Sub-total: {{ getSubtotal(item.subtotal) }} </v-col>
        </v-row>
      </v-col>
      <span>Total: {{ formatter.format(getTotal) }}</span>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListCart',
  data() {
    return {
      cantidad: 0,
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    }
  },
  computed: {
    ...mapState(['itemsCart', 'countCart', 'total']),
    // Obtener el listado de los productos agregados en el carrito
    getItems() {
      return this.itemsCart
    },
    // Obtener el total
    getTotal() {
      return this.total
    },
  },
  methods: {
    ...mapActions(['updateCount', 'updateCountMinus']),
    // Función para aumentar la cantidad por producto
    updateCart(item) {
      return this.updateCount(item)
    },
    // Función para disminuir la cantidad por producto
    updateCartMinus(item) {
      return this.updateCountMinus(item)
    },
    // Función para obtener el subtotal
    getSubtotal(subtotal) {
      return this.formatter.format(subtotal)
    },
  },
}
</script>
