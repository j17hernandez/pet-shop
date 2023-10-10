<template>
    <content>

        <v-carousel
        cycle
        height="600"
        hide-delimiter-background
        :show-arrows="false"
        >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="require('assets/img/PRuebas.png')"
        >
        </v-carousel-item>
        </v-carousel>

        <v-container>
        <ListaProductos />
        </v-container>
    </content>
  </template>



  <script>
  import ListaProductos from '@/components/listaProductos.vue'
//   import slideSevices from "./slideSevices.vue"
    export default {
    
     components:{
        ListaProductos,
     },
    }
  </script>