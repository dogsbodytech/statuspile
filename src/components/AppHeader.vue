<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-if="auth.authResult" avatar text-xs-center>
          <v-list-tile-avatar>
            <img :src="auth.authResult.idTokenPayload.picture" alt>
          </v-list-tile-avatar>
          <v-list-tile-title v-text="auth.authResult.idTokenPayload.nickname"></v-list-tile-title>
        </v-list-tile>

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
        <v-list-tile
          active-class="green--text"
          @click="drawer = !drawer"
          :to="{ name: 'about' }"
          exact
        >
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          active-class="green--text"
          @click="drawer = !drawer"
          :to="{ name: 'privacy' }"
          exact
        >
          <v-list-tile-action>
            <v-icon>vpn_lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Privacy Policy</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          active-class="green--text"
          @click="drawer = !drawer"
          :to="{ name: 'terms' }"
          exact
        >
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Terms of Service</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile active-class="green--text" v-if="!auth.authResult" @click="login()">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          active-class="green--text"
          v-if="auth.authResult"
          @click="auth.logout();drawer = !drawer;"
        >
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
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
import auth from "../auth/AuthService";

export default {
  name: "app-header",
  data() {
    return {
      drawer: false,
      auth
    };
  },
  methods: {
    login: function() {
      this.$sendAnalyticsPing({ path: "/login", name: "login" });
      localStorage.setItem(
        "activeServices",
        JSON.stringify(this.$manager.activeServices)
      );
      this.auth.login();
    }
  }
};
</script>