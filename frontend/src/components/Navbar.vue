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
        <v-btn class="button"
               @click="changeRoute('search')">
          <v-icon class="icon">mdi-card-search</v-icon>
          Search for Notes
        </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button"
               @click="changeRoute('create')">
          <v-icon class="icon">mdi-fountain-pen-tip</v-icon>
          New Note
        </v-btn>
      </v-col>
      <v-col class="button-col">
          <v-btn
          @click="logout"
          v-if="loggedIn">
            <v-icon class="icon">mdi-account</v-icon>
            Logout
          </v-btn>
        <v-dialog
            v-else
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
            <v-card-text>
              <v-form>
                      <v-text-field
                          v-model.lazy.trim="username"
                          label="Username"
                          required
                          @keyup.enter="login().then(()=>{isActive.value = false; loggedIn = true});"
                      ></v-text-field>
                      <v-text-field
                          v-model.lazy.trim="password"
                          label="Password"
                          required
                          @keyup.enter="login().then(()=>{isActive.value = false; loggedIn = true});"
                          type="password"
                      ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="login().then(()=>{isActive.value = false; loggedIn = true});"
              >Login</v-btn>
              <v-btn
                  text
                  @click="register().then(()=>{login().then(() => {isActive.value = false; loggedIn = true});});"
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
let loggedIn = ref(false);
function changeRoute(route){
  router.push("/" + route);
}

function register(){
  return API.registerUser(username.value, password.value);
}

function login(){
  return API.login(username.value, password.value);
}

function logout(){
  API.logout().then(() => {loggedIn.value = false;});
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