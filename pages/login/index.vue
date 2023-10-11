<template>
  <section>
    <v-row
      no-gutters
      style="height: 100% !important; position: absolute; width: 100%"
    >
      <v-col class="d-none d-md-flex" cols="12" sm="12" md="6" lg="6">
        <v-carousel v-model="model" height="100%" cycle>
          <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="require(`~/assets/img/${image}.jpg`)"
            cover
            height="100%"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col class="sect-login" cols="12" sm="12" md="6" lg="6">
        <v-col
          offset-md="2"
          cols="12"
          sm="12"
          md="8"
          class="text-center pt-0"
          style="position: relative"
        >
          <Login />
        </v-col>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { generateMock } from '../../mocks/users'
import Login from '@/components/login/login.vue'

export default {
  name: 'LoginPage',
  components: {
    Login,
  },
  layout: 'login',
  data() {
    return {
      model: 0,
      images: ['login1', 'login2', 'login3', 'login4'],
    }
  },
  mounted() {
    generateMock()
  },
}
</script>
<style scoped>
.v-item-group {
  height: 100% !important;
}

.sect-login {
  background-color: white;
  position: relative;
}
</style>
