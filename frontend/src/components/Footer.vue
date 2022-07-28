<template>
  <v-card height="100px" class="footer">
    <v-footer
        v-bind="localAttrs"
        :padless="padless"
    >
        <v-card-text class="white--text">
          <a href="">Impressum/Legal Notice</a>
        </v-card-text>
    </v-footer>

    <v-row
        align="center"
        justify="center"
        class="ma-12"
    >
      <v-col
          cols="12"
          md="8"
      >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    localAttrs () {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
  },
}
</script>

<style>
.footer{
  position:fixed;
  bottom:0;
}
</style>