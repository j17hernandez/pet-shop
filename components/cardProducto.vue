<template>
  <v-container>
    <v-card class="d-flex align-center flex-column" style="border-radius: 20px; box-sizing: border-box;">
      <v-card-text class="p-0" style="padding: 0px">
        <div class="product__image">
          <v-img
            :src="item.photo"
            :lazy-src="require('assets/img/jar-loading.gif')"
            :alt="item.name"
            contain
            width="126px"
            height="151px"
          />
        </div>
        <!-- <div :class="stockClass">
          <span> {{ titleStock }} </span>
        </div> -->
      </v-card-text>
      <v-card-title class="d-flex card__product__title">
        <v-row no-gutters class="text-left">
          <v-col cols="12" md="12">
            <v-tooltip bottom>
              <template #activator="{ on }">
                <span class="product__name" v-on="on">
                  {{ item.name }}
                </span>
              </template>
              {{ item.name }}
            </v-tooltip>
          </v-col>
          <v-col class="product__rating-price mt-5">
            <v-rating
              class="product__rating"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              hover
              small
              length="5"
              size="15"
              :value='5'
            ></v-rating>
            <span class="product__price">
              ${{ formatter.format(item.price) }}
            </span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-actions class="product__actions mt-5">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="6">
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
          <v-col cols="12" sm="12" md="6">
            <v-btn
              block
              color="primary darken-3"
              :disabled="validationAddcart"
              @click="openModalDetail(item)"
            >
              Comprar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-layout row justify-center>
      <v-dialog v-model="modalDetail" persistent max-width="800px">
        <ModalDetail
          :item="itemSelected"
          @close="closeModal"
          @addCarrito="addCart"
        ></ModalDetail>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import ModalDetail from '@/components/modalDetail.vue'
export default {
  name: 'CardComponent',
  components: {
    ModalDetail,
  },
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
      formatter: new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }),
      cantidad: 0,
      titleStock: '',
      stockClass: '',
      itemSelected: {},
      modalDetail: false,
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
      //   const i = { ...item, cantidad: this.cantidad }
      this.addItem(item)
    },
    openModalDetail(item) {
      const i = { ...item, cantidad: this.cantidad }
      this.addCart(i)
      this.itemSelected = i
      this.modalDetail = true
    },
    closeModal() {
      this.modalDetail = false
    },
  },
}
</script>

<style lang="scss" scoped>
$rating-padding: 0;
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

.product__image {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.card__product__title {
  padding: 0px 20px 0px 20px;
  letter-spacing: 0.5px;
  line-height: 1rem;
}
.product__name {
  font-size: 16px;
  word-break: break-word;
}
.product__rating-price {
  display: flex;
  justify-content: space-between;
}
.product__rating {
  width: 50%;
  display: flex;
  gap: 5px;
}

.product__rating .v-icon {
  padding: 0px !important;
}
.product__price {
  font-size: 16px;
}
.product__actions {
  padding: 0px 20px 2px 20px !important;
}
</style>
