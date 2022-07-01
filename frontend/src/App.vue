<template>
  <v-app>
    <v-main>
      <Navbar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
