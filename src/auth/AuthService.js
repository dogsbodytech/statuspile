// src/Auth/AuthService.js

import auth0 from "auth0-js";
import EventEmitter from "eventemitter3";
import router from "./../router";

class AuthService {
  authResult;

  expiresAt;
  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();

  auth0 = new auth0.WebAuth({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
    redirectUri: location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        router.push({ name: "dashboard" });
      } else if (err) {
        router.push({ name: "home" });
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    this.authResult = authResult;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    this.authNotifier.emit("authChange", { authenticated: true });

    localStorage.setItem("loggedIn", true);
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
      }
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;

    this.userProfile = null;
    this.authNotifier.emit("authChange", false);

    localStorage.removeItem("loggedIn");

    // navigate to the home route
    router.push({ name: "home" });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt && localStorage.getItem("loggedIn") === "true";
  }
}

export default new AuthService();
