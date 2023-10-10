<template>
  <v-container justify="center" align="center">
    <loading-component v-if="isLoading" />
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-expansion-panels v-model="panels" accordion class="accordion_group">
          <v-expansion-panel class="accordion">
            <v-expansion-panel-header class="accordion__header">
              <h2 class="accordion__header__title">Datos personales</h2>
              <template #actions>
                <v-icon color="white"> mdi-chevron-down </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mt-5">
                <v-form
                  ref="formPersonalData"
                  v-model="is_personal_data_valid"
                  lazy-validation
                >
                  <div class="form-group">
                    <v-text-field
                      v-model="name"
                      :rules="name_rules"
                      label="Nombres"
                      placeholder="Nombres"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="last_name"
                      :rules="last_name_rules"
                      label="Apellidos"
                      placeholder="Apellidos"
                      outlined
                      dense
                    />
                  </div>
                  <div class="form-group__row">
                    <v-select
                      v-model="document_type"
                      class="form-group__row__item"
                      label="Tipo de documento"
                      placeholder="Tipo de documento"
                      :items="list_documents_type"
                      item-text="name"
                      :rules="document_type_rules"
                      outlined
                      dense
                      return-object
                    />

                    <v-text-field
                      v-model="document"
                      :rules="document_rules"
                      class="form-group__row__item"
                      label="Documento"
                      placeholder="Documento"
                      outlined
                      dense
                    />
                  </div>
                  <v-row class="form-group" no-gutters>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="cellphone"
                        :rules="cellphone_rules"
                        label="Télefono"
                        placeholder="Télefono"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>
                  <div class="d-flex justify-end">
                    <v-btn color="primary" @click="updatePersonalDataLocal">
                      Guardar
                    </v-btn>
                  </div>
                </v-form>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="accordion">
            <v-expansion-panel-header class="accordion__header">
              <h2 class="accordion__header__title">Dirección de envio</h2>
              <template #actions>
                <v-icon color="white"> mdi-chevron-down </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mt-5">
                <v-form
                  ref="formShippingAddress"
                  v-model="is_shipping_address_valid"
                  lazy-validation
                >
                  <div class="form-group">
                    <v-text-field
                      v-model="state"
                      :rules="state_rules"
                      label="Departamento"
                      placeholder="Departamento"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="city"
                      :rules="city_rules"
                      label="Ciudad"
                      placeholder="Ciudad"
                      outlined
                      dense
                    />
                  </div>
                  <div class="form-group">
                    <v-text-field
                      v-model="locality"
                      :rules="locality_rules"
                      label="Localidad"
                      placeholder="Localidad"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="address"
                      :rules="address_rules"
                      label="Dirección"
                      placeholder="Dirección"
                      outlined
                      dense
                    />
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn color="primary" @click="updateShippingAddressData">
                      Guardar
                    </v-btn>
                  </div>
                </v-form>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="accordion">
            <v-expansion-panel-header class="accordion__header">
              <h2 class="accordion__header__title">Método de pago</h2>
              <template #actions>
                <v-icon color="white"> mdi-chevron-down </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mt-5">
                <v-form
                  ref="formPaymentGateway"
                  v-model="is_payment_gateway_valid"
                  lazy-validation
                >
                  <div class="form-group">
                    <v-text-field
                      v-model="card_name"
                      :rules="card_name_rules"
                      label="Nombre de la tarjeta"
                      placeholder="Nombre de la tarjeta"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="card_number"
                      :rules="card_number_rules"
                      label="Número de la tarjeta"
                      placeholder="Número de la tarjeta"
                      outlined
                      dense
                    />
                  </div>
                  <div class="form-group">
                    <v-text-field
                      v-model="expiration_date"
                      :rules="expiration_date_rules"
                      label="Fecha de vencimiento"
                      placeholder="Fecha de vencimiento"
                      outlined
                      dense
                    />
                    <v-text-field
                      v-model="card_verification_code"
                      :rules="card_verification_code_rules"
                      label="CVC/CVV"
                      placeholder="CVC/CVV"
                      outlined
                      dense
                    />
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn color="primary" @click="updatePaymentGatewayData">
                      Guardar
                    </v-btn>
                  </div>
                </v-form>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <ListCart />
        <v-container class="mt-5">
          <v-card class="card_list_discount">
            <v-card-title class="card_title">
              <v-col>
                <h2 class="card_title_discount">
                  ¿Tienes un bono de descuento?
                </h2>
              </v-col>
            </v-card-title>
            <v-card-text class="mt-5">
              <div class="card_discount">
                <div class="card_discount__input">
                  <v-text-field
                    v-model="discount"
                    label="Ingresa tu cupón"
                    solo
                    filled
                    dense
                  />
                </div>
                <div class="card_discount__btn">
                  <v-btn color="primary">Aplicar</v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <div class="mt-5">
            <v-btn
              color="primary"
              block
              :disabled="isPayButtonDisabled"
              @click="pay"
              >Pagar</v-btn
            >
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListCart from '@/components/listaCarrito.vue'
import LoadingComponent from '~/components/loading.vue'

export default {
  name: 'PaymentGateway',
  components: {
    ListCart,
    LoadingComponent,
  },
  data() {
    return {
      isLoading: false,
      panels: 0,
      list_documents_type: [
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
      is_personal_data_valid: false,
      name: '',
      name_rules: [(v) => !!v || 'El nombre es requerido'],
      last_name: '',
      last_name_rules: [(v) => !!v || 'Los apellidos son requeridos'],
      document_type: null,
      document_type_rules: [(v) => !!v || 'El tipo de documento es requerido'],
      document: '',
      document_rules: [(v) => !!v || 'El documento es requerido'],
      cellphone: '',
      cellphone_rules: [(v) => !!v || 'El teléfono es requerido'],
      is_shipping_address_valid: false,
      state: '',
      state_rules: [(v) => !!v || 'El departamento es requerido'],
      city: '',
      city_rules: [(v) => !!v || 'La ciudad es requerida'],
      locality: '',
      locality_rules: [(v) => !!v || 'La localidad es requerida'],
      address: '',
      address_rules: [(v) => !!v || 'La dirección es requerida'],
      is_payment_gateway_valid: false,
      card_name: '',
      card_name_rules: [(v) => !!v || 'El nombre de la tarjeta es requerido'],
      card_number: '',
      card_number_rules: [
        (v) => !!v || 'El número de la tarjeta es requerido',
        (v) => this.isValidCreditCardNumber(v) || 'Número de tarjeta no válido',
      ],
      expiration_date: '',
      expiration_date_rules: [
        (v) =>
          /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(v) || 'El formato no es válido',
      ],
      card_verification_code: '',
      card_verification_code_rules: [
        (v) => /^[0-9]{3,4}$/.test(v) || 'El código no es válido',
      ],
      discount: '',
    }
  },
  computed: {
    ...mapGetters(['getCountCart']),
    isEmptyListCart() {
      return this.getCountCart === 0
    },
    isPayButtonDisabled() {
      return !(
        this.is_personal_data_valid &&
        this.is_shipping_address_valid &&
        this.is_payment_gateway_valid &&
        !this.isEmptyListCart
      )
    },
  },
  methods: {
    ...mapActions([
      'updatePersonalData',
      'updateShippingAddress',
      'updatePaymentGateway',
      'cleanAllData',
    ]),
    validatePersonalData() {
      return this.$refs.formPersonalData.validate()
    },
    validateShippingAddress() {
      return this.$refs.formShippingAddress.validate()
    },
    isValidCreditCardNumber(cardNumber) {
      // Elimina espacios en blanco y guiones del número de tarjeta
      const cleanedCardNumber = cardNumber.replace(/[\s-]/g, '')
      // La expresión regular verifica que el número
      // consista solo en dígitos y tenga entre 11 y 19 caracteres.
      const regex = /^[0-9]{11,19}$/
      return !!regex.test(cleanedCardNumber)
    },
    isValidPaymentGateway() {
      return this.$refs.formPaymentGateway.validate()
    },
    updatePersonalDataLocal() {
      if (this.validatePersonalData()) {
        const data = {
          name: this.name,
          last_name: this.last_name,
          document_type: this.document_type,
          document: this.document,
          cellphone: this.cellphone,
        }
        this.loading(this.updatePersonalData, data)
        this.panels++
      }
    },
    updateShippingAddressData() {
      if (this.validateShippingAddress) {
        const data = {
          state: this.state,
          city: this.city,
          locality: this.locality,
          address: this.address,
        }
        this.loading(this.updateShippingAddress, data)
        this.panels++
      }
    },
    updatePaymentGatewayData() {
      if (this.isValidPaymentGateway()) {
        const data = {
          card_name: this.card_name,
          card_number: this.card_number,
          expiration_date: this.expiration_date,
          verification_code: this.card_verification_code,
        }
        this.loading(this.updatePaymentGateway, data)
        this.panels = 0
      }
    },
    pay() {
      this.$swal(`Excelente ${this.name}`, 'Su pago fue exitoso', 'success')
      this.$refs.formPersonalData.reset()
      this.state = ''
      this.city = ''
      this.locality = ''
      this.address = ''
      this.card_name = ''
      this.card_number = ''
      this.expiration_date = ''
      this.card_verification_code = ''
      this.discount = ''
      this.loading(this.cleanAllData, {})
      this.$router.push('/')
    },
    loading(callback, data) {
      this.isLoading = true
      callback(data)
      setTimeout(() => {
        this.isLoading = false
      }, 400)
    },
  },
}
</script>
<style lang="scss" scoped>
.v-expansion-panel:not(:first-child)::after {
  border-top: 0px !important;
}
.accordion_group {
  gap: 15px;
}
.accordion {
  border-radius: 30px 0px 30px 30px !important;
}
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
.form-group__row {
  display: flex;
  gap: 10px;
  width: 100%;
}
.form-group__row__item {
  width: 50%;
}

.card_title {
  background-color: #00489c;
  padding: 5px;
}

.card_title_discount {
  color: white;
  font-size: 18px;
}

.card_list_discount {
  border-radius: 30px 0px 30px 30px;
}

.card_discount {
  display: flex;
  gap: 10px;
}
.card_discount__input {
  width: 70%;
}
.card_discount__btn {
  width: 30%;
}
</style>
