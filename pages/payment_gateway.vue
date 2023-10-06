<template>
  <v-container justify="center" align="center">
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-expansion-panels v-model="panels" accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="accordion__header">
              <h2 class="accordion__header__title">Datos personales</h2>
              <template #actions>
                <v-icon color="white"> mdi-chevron-down </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mt-5">
                <v-form ref="form" lazy-validation>
                  <div class="form-group">
                    <v-text-field label="Nombre" solo />
                    <v-text-field label="Apellido" solo />
                  </div>
                  <div class="form-group">
                    <v-select
                      :items="type_documents"
                      item-text="name"
                      label="Tipo de documento"
                      solo
                      return-object
                    />
                    <v-text-field label="Documento" solo />
                  </div>
                  <v-row class="form-group" no-gutters>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field label="Télefono" solo />
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header class="accordion__header">
              <h2 class="accordion__header__title">Dirección de envio</h2>
              <template #actions>
                <v-icon color="white"> mdi-chevron-down </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mt-5">
                <v-form ref="form" lazy-validation>
                  <div class="form-group">
                    <v-text-field label="Departamento" solo />
                    <v-text-field label="Ciudad" solo />
                  </div>
                  <div class="form-group">
                    <v-text-field label="Localidad" solo />
                    <v-text-field label="Dirección" solo />
                  </div>
                </v-form>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <ListCart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCart from '@/components/listaCarrito.vue'
export default {
  name: 'PaymentGateway',
  components: {
    ListCart,
  },
  data() {
    return {
      panels: 0,
      type_documents: [
        {
          id: 1,
          name: 'Cédula',
        },
        {
          id: 2,
          name: 'Cédula de extranjería',
        },
        {
          id: 3,
          name: 'Tarjeta de identidad',
        },
      ],
    }
  },
}
</script>
<style>
.accordion__header {
  background-color: #00489c;
}
.accordion__header__title {
  color: white;
  font-size: 18px;
}
.form-group {
  display: flex;
  gap: 10px;
}
</style>
