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
            v-model="dialog"
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
              <v-form v-model="valid">
                      <v-text-field
                          v-model="username"
                          label="Username"
                          required
                      ></v-text-field>
                      <v-text-field
                          v-model="password"
                          label="Password"
                          required
                      ></v-text-field>
              </v-form>
            </v-card-header-text>

            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="isActive.value = false"
              >Login</v-btn>
              <v-btn
                  text
                  @click="isActive.value = false"
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

function changeRoute(route){
  router.push("/" + route);
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