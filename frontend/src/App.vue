<template>
  <v-app>
    <v-main>
      <Navbar/>
      <router-view/>
      <Footer/>
      <v-snackbar
          v-model="snackbar.show"
          :timeout="10_000"
          @click="snackbar.show = false">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn text @click="snackbar.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";
import {API} from "@/services/API-Service";
import Footer from "@/components/Footer.vue";

const snackbar = ref({
      show: false,
      text: "",
    }
);

function setSnackbar(text: string) {
  snackbar.value.text = text;
  snackbar.value.show = true;
}

API.axios.interceptors.response.use(

    response => response,
    error => {
      switch (error.response.status) {
        case 400:
          setSnackbar("Bad request: " + error.response.data);
          break;
        case 401:
          setSnackbar("Unauthorized - please login and try again.");
          break;
        case 403:
          setSnackbar("You don't have permission to view or do this.");
          break;
        case 404:
          setSnackbar("Nothing was found.");
          break;
        case 500:
          setSnackbar("Internal server error.");
          break;
      }
      return Promise.reject(error);
    });
</script>
