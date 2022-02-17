<template>
  <v-overlay>
    <v-container class="row align-center justify-center">
      <v-progress-circular
        size="84"
        indeterminate
        color="white darken-2"
      ></v-progress-circular>
      <v-container class="row align-center justify-center">
        <h1>Loading...</h1>
      </v-container>
    </v-container>
  </v-overlay>
</template>
<script>
export default {
  name: 'LoadingComponent',
}
</script>
