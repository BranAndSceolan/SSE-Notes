<template>
  <v-app-bar
      dense
      elevation="0"
      class="appBar"
  >
    <v-row>
      <v-col class="button-col">
        <v-btn class="button"
        @click="changeRoute('documents')">
          <v-icon class="icon">mdi-card-text</v-icon>
          View Notes
        </v-btn>
      </v-col>
      <v-col class="button-col">

        <v-dialog
            transition="dialog-top-transition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props">
              <v-icon class="icon">mdi-account</v-icon>
              Login
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
          <v-card class="loginPrompt">
            <v-card-header-text>
              <v-form>
                      <v-text-field
                          v-model.lazy.trim="username"
                          label="Username"
                          required
                      ></v-text-field>
                      <v-text-field
                          v-model.lazy.trim="password"
                          label="Password"
                          required
                      ></v-text-field>
              </v-form>
            </v-card-header-text>

            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="login();"
              >Login</v-btn>
              <v-btn
                  text
                  @click="register();"
              >Register now</v-btn>
              <v-btn
                  text
                  @click="isActive.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-app-bar>
  <!-- div used to space elements at the top of the screen to not be below the navbar -->
  <div style="display: flex; margin-bottom: 3em"></div>
</template>

<script setup>
import router from "@/router";
import {API} from "@/services/API-Service";
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function changeRoute(route){
  router.push("/" + route);
}

function register(){
  API.registerUser(username.value, password.value);
}

function login(){
  API.login(username.value, password.value);
}
</script>

<style scoped lang="scss">
.appBar{
  background-color: aliceblue;
  position: absolute;
  z-index: 100;
}

.icon{
  padding: 2px;
}

.button-col{
  display: flex;
  justify-content: center;
}

.loginPrompt{
  padding: 1.2em
}
</style>