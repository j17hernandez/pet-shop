<template>
  <v-card class="v-card">
    <v-card-title primary-title class="v-card-title">
      <v-row>
        <v-col>
          <h3 class="headline mb-0 mt-1" style="color: white;">Confirmación de compra</h3>
        </v-col>
        <v-col style="padding-top: 0px; padding-left: 0px; padding-right: 0px">
          <v-btn class="float-right" icon color="white" x-large @click="close">
            <v-icon class="mt-2">mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="card__text">
      <v-row no-gutters>
        <v-col>
          <v-img
            :src="item.photo"
            :lazy-src="require('assets/img/jar-loading.gif')"
            :alt="item.name"
            width="320px"
            height="320px"
            style="border-radius: 10px; margin-top: 18px;"
            class="image"
          />
        </v-col>
        <v-col>
          <v-col class="item-name">
            <h1 >{{ item.name }}</h1>
          </v-col>
          <v-col>
            <h2>Precio: ${{ formatter.format(item.price) }}</h2>
          </v-col>
          <v-col md="5">
            <h3 class="mb-2">Cantidad</h3>
            <v-text-field class="TextField"
              v-model="cantidad"
              outlined
              dense  
              append-outer-icon="mdi-plus"
              prepend-icon="mdi-minus"
              @click:prepend="cantidad--"
              @click:append-outer="cantidad++"
            />
          </v-col>
         <v-col class="text-justify">
             <p>
             {{ item.description }}
            </p>
            <h4>Subtotal: ${{ formatter.format(item.price * cantidad) }}</h4>
          </v-col>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="v-card-actions">
      <v-spacer></v-spacer>
      <v-btn color="white" @click="close">Seguir Comprando</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary darken-3" @click="addCarrito">Agregar al carro</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ModalDetail',
  props: {
    item: {
      type: Object,
      default: () => {},
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
  created() {
    this.cantidad = this.item.cantidad
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addCarrito() {
      const i = { ...this.item, cantidad: this.cantidad }
      this.$emit('addCarrito', i)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-sheet.v-card {
  border-radius: 20px;
}

.card__text{
  font-family: 'Poppins', sans-serif;
  line-height: initial;
}

.headline{
  font-family: 'Poppins', sans-serif
}
.item-name{
  font-family: 'Poppins', sans-serif;
}

.v-card-title.v-card__title{
  background-color: #00489c;
  padding: 15px 25px 15px;
}

.image{
 align-items : center;
 padding-top: 2px;
}

.v-card-actions.v-card__actions{
  background-color: #ebebeb;
  padding: 17px 16px;
}
</style>
