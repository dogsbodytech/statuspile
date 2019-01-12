<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-title class="blue-grey darken-2 justify-center">
        <span>
          &copy; Copyright 2018-{{ new Date().getFullYear() }}
          <a
            href="https://www.dogsbody.com/?utm_source=statuspile"
            title="Linux IT support specialists"
            rel="nofollow"
          >Dogsbody Technology Ltd.</a>
        </span>
      </v-card-title>
    </v-card>
  </v-footer>
</template>


<script>
export default {
  name: "app-footer",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
a {
  color: inherit;
}
</style>