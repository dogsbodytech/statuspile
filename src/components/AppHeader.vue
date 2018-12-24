<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile
          active-class="green--text"
          @click="drawer = !drawer"
          :to="{ name: 'home' }"
          exact
        >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          active-class="green--text"
          @click="drawer = !drawer"
          :to="{ name: 'dashboard' }"
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" @click="drawer = !drawer">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-flex xs12>
        <v-img class="mx-auto" :src="require('../assets/logo.svg')" contain width="200"></v-img>
      </v-flex>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>


<script>
export default {
  name: "app-header",
  data() {
    return {
      drawer: false
    };
  }
};
</script>