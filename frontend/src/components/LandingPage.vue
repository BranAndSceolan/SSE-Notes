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

<script lang='ts'>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'HelloWorld',

  data () {
    return {
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Roadmap',
          href: 'https://vuetifyjs.com/en/introduction/roadmap/',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }
  },
})
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