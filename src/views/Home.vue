<template>
  <!-- Homepage html inside template block -->
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to StatusPile</h1>
        <p
          class="subheading font-weight-regular"
        >A status page of status pages that consolidates the status pages of various providers into one easily viewable screen giving you the ability to see an overview of all your upstream providers in one place.</p>
      </v-flex>

      <v-layout align-center>
        <v-flex xs12 text-xs-center>
          <v-tooltip top>
            <v-btn :to="{ name: 'dashboard' }" slot="activator" color="green darken-3" dark fab>
              <v-icon>chevron_right</v-icon>
            </v-btn>
            <span>Go To Dashboard</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>


<style scoped lang="scss">
/** Home page css here */
</style>