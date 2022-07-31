<template>
  <v-container class="greeting">
    <h1>Login to create notes!</h1>
  </v-container>
  <v-container class="cookieInfo">
    <h3> We respect your privacy. </h3>
    We only use <b>essential cookies</b> to run this site. <br> These cookies are necessary to authenticate users and prevent fraudulent use of user accounts. <br>
    We don't use third-party, tracking or analytics cookies.<br>
  </v-container>
  <v-container class="cookieInfo">
    <h3> Wir respektieren Ihre Privatsphäre. </h3>
    Wir nutzen nur <b>essentielle cookies</b> um diese Seite zu betreiben. <br> Diese Cookies sind notwendig, damit sich Nutzer authentifizieren können, und die Website vor Angriffen geschützt werden kann.<br>
    Wir setzen keine Cookies Dritter und keine Cookies zu Tracking- oder Analysezwecken.<br>
  </v-container>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.cookieInfo{
  background-color: aliceblue;
}

.greeting{
  margin-bottom: 2.5em;
  margin-top: 4.0em;
}
</style>