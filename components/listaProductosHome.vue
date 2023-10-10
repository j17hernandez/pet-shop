<template>
    <content>
        <v-carousel
        cycle
        height="600"
        hide-delimiter-background
        :show-arrows="false"
        >
        <v-carousel-item
            :src="require('assets/img/Pruebas.png')"
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
    export default {
    
     components:{
        ListaProductos,
     },
    }
  </script>