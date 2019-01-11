<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <v-container fluid>
        <router-view :key="$route.name"></router-view>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>


<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import auth from "./auth/AuthService";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {};
  },
  created() {
    this.$manager.init();
    if (localStorage.getItem("loggedIn") === "true") {
      auth.renewSession();
    }
  }
};
</script>


<style lang="scss" src="./styles/app.scss"></style>