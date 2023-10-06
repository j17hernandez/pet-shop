<template>
  <v-card width="600px" class="card_list_cart">
    <v-card-title class="card_title">
      <v-col cols="12">
        <h2 class="card_title_cart">Resumen de compra</h2>
      </v-col>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row class="text-left">
          <v-container class="cart_list">
            <v-col v-for="(item, i) in getItems" :key="i" cols="12">
              <v-row>
                <v-col sm="2" md="2" lg="2">
                  <v-img
                    :src="item.photo"
                    :lazy-src="require('assets/img/jar-loading.gif')"
                    :alt="item.name"
                    width="50px"
                    height="50px"
                    style="border-radius: 10px; margin-top: 10px"
                    class="image"
                  />
                </v-col>
                <v-col sm="2" md="3" lg="3">
                  <h5>{{ item.name }}</h5>
                  <span> ${{ formatter.format(item.price) }} </span>
                </v-col>
                <v-col md="3" lg="3" sm="3">
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
                <v-col sm="3" md="3" lg="3">
                  Sub-total: {{ getSubtotal(item.subtotal) }}
                </v-col>
                <v-col sm="2" md="1" lg="1" class="text-center">
                  <v-btn icon @click="deleteItemCart(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
          <span v-if="getItems.length === 0" class="mt-2">
            No hay productos en el carrito
          </span>
          <span v-else>Total: ${{ formatter.format(getTotal) }}</span>
        </v-row>
        <v-row v-if="showPayButton">
          <v-col justify-center class="text-center">
            <v-btn color="primary" @click="sendPay"> Proceder al pago </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListCart',
  props: {
    showPayButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cantidad: 0,
      formatter: new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
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
    ...mapActions(['updateCount', 'updateCountMinus', 'deleteItem']),
    // Función para aumentar la cantidad por producto
    updateCart(item) {
      return this.updateCount(item)
    },
    // Función para disminuir la cantidad por producto
    updateCartMinus(item) {
      return this.updateCountMinus(item)
    },
    deleteItemCart(item) {
      return this.deleteItem(item)
    },
    // Función para obtener el subtotal
    getSubtotal(subtotal) {
      return `$ ${this.formatter.format(subtotal)}`
    },
    sendPay() {
      this.$router.push('/payment_gateway')
    },
  },
}
</script>

<style lang="scss" scoped>
.card_title {
  background-color: #00489c;
  padding: 5px;
}

.card_title_cart {
  color: white;
  font-size: 18px;
}

.cart_list {
  max-height: 400px;
  overflow: auto;
}
.card_list_cart {
  border-radius: 30px 0px 30px 30px;
}
</style>
