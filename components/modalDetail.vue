<template>
  <v-card>
    <v-card-title primary-title>
      <v-row>
        <v-col>
          <h3 class="headline mb-0">Producto agregado</h3>
        </v-col>
        <v-col style="padding-top: 0px; padding-left: 0px; padding-right: 0px">
          <v-btn class="float-right" icon color="red" x-large @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-img
            :src="item.photo"
            :lazy-src="require('assets/img/jar-loading.gif')"
            :alt="item.name"
            width="330px"
            height="330px"
            style="border-radius: inherit"
            class="image"
          />
        </v-col>
        <v-col>
          <v-col>
            <h1>{{ item.name }}</h1>
          </v-col>
          <v-col>
            <h2>Código: {{ item.code }}</h2></v-col
          >
          <v-col>
            <h2>Precio: {{ formatter.format(item.price) }}</h2>
          </v-col>
          <v-col md="6">
            Cantidad
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
            <h4>Subtotal: {{ formatter.format(item.price * cantidad) }}</h4>
          </v-col>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <p>
            {{ item.description }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="info" @click="close">Seguir Comprando</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary darken-3" @click="addCarrito"
        >Agregar al carro</v-btn
      >
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
  created() {
    this.cantidad = this.item.cantidad
  },
  data() {
    return {
      cantidad: 0,
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    }
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
