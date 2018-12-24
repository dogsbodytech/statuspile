<template>
  <div>
    <div class="text-xs-center" v-if="activeProviders.length">
      <v-progress-circular
        v-if="clock==100"
        :width="5"
        :size="50"
        color="green darken-3"
        indeterminate
      ></v-progress-circular>
      <v-tooltip bottom>
        <v-progress-circular
          slot="activator"
          v-if="clock!=100"
          :rotate="270"
          :size="50"
          :width="10"
          :value="clock"
          color="green darken-3"
        >{{clock}}</v-progress-circular>
        <span>Refresh Countdown</span>
      </v-tooltip>
    </div>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex
          d-flex
          xs12
          sm6
          md4
          lg3
          xl2
          :key="service.id"
          v-for="service in $manager.activeServices"
        >
          <v-card raised class="status-card" :color="'lighten-3 '+statusColorMap[service.status]">
            <v-img aspect-ratio="8">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 text-xs-center flexbox>
                    <span class="headline">{{service.providerName}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-card-title primary-title>
              <v-flex>
                <h3 class="headline mb-0 text-xs-center mb-2">{{service.name}}</h3>
                <div class="text-xs-center">{{service.description}}</div>
              </v-flex>
            </v-card-title>
            <v-divider light></v-divider>
            <v-card-actions justify-self-end>
              <v-flex text-xs-center>
                <h3>{{service.statusText}}</h3>
              </v-flex>
              <v-btn icon @click="removeService(service)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout align-center>
      <v-flex xs12 text-xs-center>
        <v-tooltip top>
          <v-btn :to="{ name: 'add-service' }" slot="activator" color="green darken-3" dark fab>
            <v-icon>add</v-icon>
          </v-btn>
          <span>Add New Service</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import _ from "underscore";

export default {
  name: "Dashboard",
  data() {
    return {
      timer: null,
      clock: 100,
      cards: {},
      statusColorMap: {
        1: "green",
        2: "yellow",
        3: "orange",
        4: "red",
        5: "red"
      },
      activeProviders: []
    };
  },
  mounted() {
    if (this.$route.query.services) {
      this.loadServicesFromQuery();
    } else {
      this.setQueryServices();
    }
    console.log(this.$manager.activeServices);
    this.registerActiveProviders();
    console.log(this.activeProviders);
    this.pollProviders();
    this.timer = setInterval(this.pollProviders.bind(this), 100000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    /**
     * Updates URL query string based on current active services
     */
    setQueryServices: function() {
      var activeServices = _.pluck(this.$manager.activeServices, "id");
      this.$router.replace({
        name: "dashboard",
        query: { services: JSON.stringify(activeServices) }
      });
    },
    /**
     * Loads current active services from URL query string
     */
    loadServicesFromQuery: function() {
      this.$manager.activeServices = [];
      var queryServices = JSON.parse(this.$route.query.services);
      _.each(queryServices, service => {
        var parts = service.split("||");
        this.$manager.activeServices.push({
          id: service,
          name: parts[0],
          providerName: parts[1]
        });
      });
    },
    /**
     * Removes service from current active servies
     */
    removeService: function(service) {
      if (confirm("Are you sure want to remove this service?")) {
        this.$manager.removeActiveService(service);
        this.setQueryServices();
        this.$forceUpdate();
      }
    },
    /**
     * Builds current active providers to watch based on current active services
     */
    registerActiveProviders: function() {
      var providerNames = [];
      _.each(this.$manager.activeServices, service => {
        if (providerNames.indexOf(service.providerName) < 0) {
          providerNames.push(service.providerName);
        }
      });

      _.each(providerNames, providerName => {
        var provider = _.find(this.$providers, { name: providerName });
        this.activeProviders.push(provider);
      });
    },
    /**
     * Refreshes the service status of all active providers
     */
    pollProviders: function() {
      console.log("Polling...");
      _.each(this.activeProviders, provider => {
        this.$helper.getServices(provider, true).then(services => {
          _.each(services, service => {
            _.each(this.$manager.activeServices, activeService => {
              if (activeService.id == service.id) {
                activeService.status = service.status;
                activeService.statusText = service.statusText;
                activeService.description = service.description;
              }
            });
          });
          this.$forceUpdate();
        });
      });

      /**
       * Takes card of small ticking clock
       * to keep user informed about refresh countdown
       */
      var clockTimer = setInterval(() => {
        this.clock--;
        if (this.clock <= 0) {
          clearInterval(clockTimer);
          this.clock = 100;
        }
      }, 1000);
    }
  }
};
</script>


<style scoped lang="scss">
.status-card {
  display: flex;
  flex-direction: column;
}
</style>