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
    audience: process.env.VUE_APP_AUTH0_AUDIENCE,
    redirectUri: location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/callback",
    responseType: "token id_token",
    scope: "openid profile email read:current_user update:current_user_metadata create:current_user_metadata user_metadata picture"
  });

  /** Management API instance */
  auth0Mgmt;

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.populateSession(authResult, authContext => {
          console.log(authContext);
          router.push({ name: "dashboard" });
        });
      } else if (err) {
        router.push({ name: "home" });
        console.log(err);
      }
    });
  }

  populateSession(authResult, callback) {
    /** https://auth0.com/docs/libraries/auth0js/v9
     * https://github.com/auth0/auth0.js#auth0management
     */
    this.auth0Mgmt = new auth0.Management({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      token: authResult.accessToken
    });

    this.auth0Mgmt.getUser(authResult.idTokenPayload.sub, (err, user) => {
      err && console.log(err);
      console.log(user);
      authResult.user = user;
      this.setSession(authResult);
      callback && callback(authResult);
    });
  }

  setSession(authResult) {
    this.authResult = authResult;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    this.authNotifier.emit("authChange", authResult);

    localStorage.setItem("loggedIn", authResult.idTokenPayload.nonce);
  }

  updateUserActiveServices(activeServices) {
    if (!this.auth0Mgmt) return;
    this.auth0Mgmt.patchUserMetadata(this.authResult.idTokenPayload.sub, { active_services: activeServices }, (err, user) => {
      err && console.log(err);
      this.authResult.user = user;
      console.log(user);
    });
  }

  renewSession() {
    console.log("Checking session...");
    this.auth0.checkSession(
      {
        audience: process.env.VUE_APP_AUTH0_AUDIENCE,
        scope: "openid profile email read:current_user update:current_user_metadata create:current_user_metadata user_metadata picture",
        nonce: localStorage.getItem("loggedIn")
      },
      (err, authResult) => {
        console.log(authResult);
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.populateSession(authResult);
        } else if (err) {
          console.log(err);
          this.logout();
        }
      }
    );
  }

  logout() {
    // Clear access token and ID token from local storage
    this.authResult = null;
    this.expiresAt = null;

    this.userProfile = null;
    this.authNotifier.emit("authChange", false);

    localStorage.removeItem("loggedIn");
    this.auth0.logout({
      returnTo: location.protocol + "//" + location.host
    });
    // navigate to the home route
    router.push({ name: "home" });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt && localStorage.getItem("loggedIn");
  }
}

export default new AuthService();
