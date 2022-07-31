<template>
<v-footer class="footer">
  <v-row
      justify="center"
  >
    <router-link to="/imprint">Imprint / Legal Notice</router-link>
    <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>SSE Notes</strong>
    </v-col>
  </v-row>
</v-footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
.footer{
  margin-top: 4em;
}
</style>