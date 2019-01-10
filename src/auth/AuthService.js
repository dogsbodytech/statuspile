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
    audience: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/api/v2/`,
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
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      err && console.log(err);
      console.log(user);
      this.setSession(authResult);
      callback && callback(authResult);
    });
  }

  setSession(authResult) {
    this.authResult = authResult;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    this.authNotifier.emit("authChange", { authenticated: true });

    this.auth0Mgmt = new auth0.Management({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      token: authResult.idToken
    });

    this.auth0Mgmt.getUser(authResult.idTokenPayload.sub, (err, user) => {
      err && console.log(err);
      console.log(user);
    });

    // this.auth0Mgmt.patchUserMetadata(authResult.idTokenPayload.sub, {}, (err, user) => {
    //   err && console.log(err);
    //   console.log(user);
    // });

    localStorage.setItem("loggedIn", true);
  }

  renewSession() {
    this.auth0.checkSession(
      {
        audience: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/api/v2/`,
        scope: "openid profile email read:current_user update:current_user_metadata create:current_user_metadata user_metadata picture"
      },
      (err, authResult) => {
        console.log(authResult);
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.populateSession(authResult);
        } else if (err) {
          this.logout();
          console.log(err);
        }
      }
    );
  }

  logout() {
    // Clear access token and ID token from local storage
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;

    this.userProfile = null;
    this.authNotifier.emit("authChange", false);

    localStorage.removeItem("loggedIn");
    console.log(this.auth0);
    this.auth0.logout({
      returnTo: location.protocol + "//" + location.host
    });
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
