<template>
  <v-container>
    <v-card style="border-radius: 20px" max-width="100%">
      <v-card-text class="p-0" style="padding: 0px">
        <div class="image">
          <v-img
            :src="item.photo"
            :lazy-src="require('assets/img/jar-loading.gif')"
            :alt="item.name"
            width="330px"
            height="330px"
            style="border-radius: inherit"
            class="image"
          />
          <div :class="stockClass">
            <span> {{ titleStock }} </span>
          </div>
        </div>
      </v-card-text>
      <v-card-title class="d-flex justify-center">
        <v-row no-gutters class="text-left">
          <v-col cols="12" md="12">
            <v-tooltip bottom>
              <template #activator="{ attrs, on }">
                <span v-bind="attrs" v-on="on">
                  {{
                    item.name.length > 22
                      ? item.name.substr(0, 22).concat('...')
                      : item.name
                  }}
                </span>
              </template>
              {{ item.name }}
            </v-tooltip>
          </v-col>
          <v-col>
            <span> {{ formatter.format(item.price) }} </span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-actions>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              v-model="cantidad"
              outlined
              dense
              append-outer-icon="mdi-plus"
              prepend-icon="mdi-minus"
              @click:prepend="cantidad--"
              @click:append-outer="cantidad++"
            />
          </v-col>
          <v-col>
            <v-btn
              block
              color="primary darken-3"
              :disabled="validationAddcart"
              @click="addCart(item)"
            >
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardComponent',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    name: {
      type: Boolean,
      default: false,
    },
    title: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
      cantidad: 0,
      titleStock: '',
      stockClass: '',
    }
  },
  computed: {
    //   Validación para permitir añadir productos al carrito, si la cantidad es menor o igual a cero
    // y el stock es igual a cero no le permitirá agregar el producto al carrito
    validationAddcart() {
      let status = true
      if (this.cantidad > 0 && this.item.stock > 0) {
        status = false
      }
      return status
    },
  },
  created() {
    // Llamada de la función que obtiene info del stock
    this.getStock()
  },
  methods: {
    ...mapActions(['addItem']),
    // Función para obtener la clase y tipo de stock, bien sea disponible o sin stock
    getStock() {
      this.stockClass = 'text-stock'
      if (this.item.stock > 0) {
        this.stockClass = this.stockClass.concat(' ', 'color-stock')
        this.titleStock = 'Disponible'
      } else {
        this.stockClass = this.stockClass.concat(' ', 'color-no-stock')
        this.titleStock = 'Sin stock'
      }
    },
    // Función para agregar productos al carrito de compras
    addCart(item) {
      const i = { ...item, cantidad: this.cantidad }
      this.addItem(i)
    },
  },
}
</script>
<style scoped>
.text-stock {
  padding: 5px;
  padding-left: 5%;
  padding-right: 5%;
  top: 420px;
  left: 251px;
  /* transform: rotate(-45deg); */
}
.text-stock span {
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 3px;
  text-align: center;
  color: whitesmoke;
}
.color-no-stock {
  background-color: rgba(255, 0, 0, 0.58039);
}
.color-stock {
  background-color: #00479b;
}
</style>
