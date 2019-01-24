<template>
  <!-- Homepage html inside template block -->
  <v-container grid-list-md fluid>
    <v-layout text-xs-center wrap class="mb-5">
      <v-flex xs12>
        <h1 class="mb-4 display-2">Your status page of status pages</h1>
        <h2 class="font-weight-regular display-1">(opensourced and free to use)</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="headline font-weight-light" :class="{'pt-4': $vuetify.breakpoint.mdAndUp}">
      <v-flex xs12 md6>
        <h3 class="mb-4 font-weight-medium">Built by people that care about opensource, for the community they serve.</h3>
        <p
          class="mb-3"
        >“We needed a status dashboard for the services we monitor for our clients. We couldn’t find one, so we built one.</p>
        <p
          class="mb-4"
        >It’s simple to use, works with AuthO authentication and is available for forking. We hope you find it as useful as we do.”</p>
        <v-layout wrap>
          <v-flex xs2>
            <v-img :src="'/assets/dan-benton.png'" contain width="50"></v-img>
          </v-flex>
          <v-flex xs10>
            <em>Dan Benton, founder</em>
            <br>
            <em>Dogsbody.com, Linux specialists</em>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md6 :class="{'mt-4': $vuetify.breakpoint.smAndDown}">
        <v-img :src="'/assets/dashboard-example-3.png'" contain></v-img>
      </v-flex>
    </v-layout>
    <v-layout align-center mt-5>
      <v-flex xs12 text-xs-center>
        <v-btn
          large
          dark
          :to="{ name: 'dashboard' }"
          color="indigo darken-4"
        >Get started - create a dashboard
          <v-icon right dark>chevron_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap mt-5 mb-5 pt-5>
      <v-flex xs12>
        <h1 class="mb-4 display-2">Add and remove services in a click</h1>
      </v-flex>
    </v-layout>
    <v-layout wrap class="headline font-weight-light" :class="{'pt-4': $vuetify.breakpoint.mdAndUp}">
      <v-flex xs12 md6 :class="{'mb-4': $vuetify.breakpoint.smAndDown}">
        <v-img :src="'/assets/addremove.png'" contain></v-img>
      </v-flex>
      <v-flex xs12 md6 pl-3>
        <h3
          class="mb-4 font-weight-medium"
        >Create your very own at-a-glance status dashboard showing your favourite service providers.</h3>
        <p
          class="mb-3"
        >With 30 providers currently available, we’ll be adding more over the coming months. We’ll also be encouraging others to add their go-to services too.</p>
        <p
          class="mb-4"
        >Create a dashboard in seconds. To save your configuration, register an account using your favourite platform, via Auth0.</p>
        <v-layout wrap>
          <v-flex>
            <v-img :src="'/assets/autho-300x100.png'" height="100" contain></v-img>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout align-center mt-5>
      <v-flex xs12 text-xs-center>
        <v-btn large dark :to="{ name: 'dashboard' }" color="indigo darken-4">Create a dashboard
          <v-icon right dark>chevron_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap mt-5 mb-5 pt-5>
      <v-flex xs12>
        <h1 class="mb-4 display-2">Contribute to what we’re building</h1>
      </v-flex>
    </v-layout>
    <v-layout wrap class="headline font-weight-light" :class="{'pt-4': $vuetify.breakpoint.mdAndUp}">
      <v-flex xs12 md6 pr-3>
        <h3 class="mb-4 font-weight-medium">We’ve started. Can you help us to evolve?</h3>
        <p
          class="mb-3"
        >We’re looking for other to request and add new services… we’re looking for feature requests and improvements.</p>
        <p class="mb-4">Even better, why not fork what we’ve created and submit a pull request?</p>
        <p
          class="mb-4"
        >All that said, if you’d rather just get stuck in and use the service, then get started now.</p>
      </v-flex>
      <v-flex xs12 md6>
        <v-img :src="'/assets/git.png'" contain></v-img>
      </v-flex>
    </v-layout>
    <v-layout align-center mt-5>
      <v-flex xs12 text-xs-center>
        <v-btn large dark :to="{ name: 'dashboard' }" color="indigo darken-4">Create a dashboard
          <v-icon right dark>chevron_right</v-icon>
        </v-btn>
      </v-flex>
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
div {
  color: #002a53;
}
</style>