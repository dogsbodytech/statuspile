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
    this.$manager.loadActiveServices();
  }
};
</script>


<style scoped lang="scss">
</style>