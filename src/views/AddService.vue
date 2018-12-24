<template>
  <div>
    <v-layout align-center>
      <v-flex xs12 text-xs-center>
        <v-tooltip top>
          <v-btn :to="{ name: 'dashboard' }" slot="activator" color="green darken-3" dark fab>
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <span>Back To Dashboard</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <v-expansion-panel popout v-model="expanded">
            <v-expansion-panel-content
              lazy
              :class="{'indigo lighten-5' : index%2 == 0, 'green lighten-5' : index%2 == 1}"
              v-for="(provider,index) in $providers"
              :key="provider.name"
            >
              <div slot="header">{{provider.name}}</div>
              <v-card>
                <div class="text-xs-center py-4" v-if="!provider.services">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                <v-container v-if="provider.services">
                  <v-list two-line>
                    <template v-for="(service, index) in provider.services">
                      <v-list-tile
                        :class="{'grey lighten-5' : index%2 == 0, 'grey lighten-3' : index%2 == 1, 'success lighten-3' : $manager.isActive(service)}"
                        :key="service.id"
                        avatar
                        ripple
                        @click="toggleService(service)"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title>{{ service.name }}</v-list-tile-title>
                          <v-list-tile-sub-title class="text--primary">{{ service.description }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-icon v-if="!$manager.isActive(service)" color="primary darken-2">add</v-icon>
                          <v-icon v-if="$manager.isActive(service)" color="primary darken-2">done</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider v-if="index + 1 < provider.services.length" :key="index"></v-divider>
                    </template>
                  </v-list>
                </v-container>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
  name: "AddService",
  data() {
    return {
      expanded: null
    };
  },
  watch: {
    expanded: function() {
      if (this.expanded != null) {
        var provider = this.$providers[this.expanded];
        this.loadServices(provider).then(() => {
          this.$forceUpdate();
        });
      }
    }
  },
  methods: {
    /**
     * Load services for given provider (can be from cache)
     */
    loadServices: function(provider) {
      return this.$helper.getServices(provider);
    },
    /**
     * Add/Remove service from current active services
     */
    toggleService: function(service) {
      if (this.$manager.isActive(service)) {
        this.$manager.removeActiveService(service);
      } else {
        this.$manager.addActiveService(service);
      }
      this.$forceUpdate();
    }
  }
};
</script>


<style scoped lang="scss"></style>