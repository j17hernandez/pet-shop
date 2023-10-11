<template>
  <v-app light>
    <v-main>
      <v-container fluid style="padding: 0px">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer class="d-block d-sm-block d-md-none" style="text-align: center">
      <span class="powered-by" style="text-align: center; width: 100%"
        >&copy; {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
}
</script>
