// src/views/Callback.vue

<template>
  <div class="text-xs-center py-4">
    <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import auth from "../auth/AuthService";

export default {
  name: "callback",
  created() {
    auth.handleAuthentication();
  }
};
</script>

<style>
.spinner {
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>