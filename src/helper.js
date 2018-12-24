import axios from "axios";
import _ from "underscore";

/**
 * Provides all features regarding service retrival
 * & common service instance translation at one place
 */

export default function() {
  var self = this;

  /**
   * Status mapping object for statuspage providers
   */
  var statuspageStatusMap = {
    operational: { id: 1, text: "Operational" },
    degraded_performance: { id: 2, text: "Degraded Performance" },
    partial_outage: { id: 3, text: "Partial Outage" },
    major_outage: { id: 4, text: "Major Outage" },
    under_maintenance: { id: 5, text: "Under Maintenance" }
  };

  /**
   * Status mapping object for cachet providers
   */
  var cachetStatusMap = {
    "1": { id: 1, text: "Operational" },
    "2": { id: 2, text: "Degraded Performance" },
    "3": { id: 3, text: "Partial Outage" },
    "4": { id: 4, text: "Major Outage" }
  };

  /**
   * Retrives & updates the list of services for specific provider
   */
  this.getServices = function(provider, refresh) {
    if (provider.services && !refresh) {
      return Promise.resolve(provider.services);
    } else {
      var url = self.getURL(provider);
      return axios.get(url).then(function(response) {
        self.parseServices(provider, response.data);
        return provider.services;
      });
    }
  };

  /**
   * Translates different providers' service instances to common format
   */
  this.parseServices = function(provider, json) {
    if (provider.type == "statuspage") {
      /** https://developer.statuspage.io/#operation/getPagesPageIdComponents */

      provider.services = _.map(json.components, function(component) {
        return {
          id: component.name + "||" + provider.name,
          name: component.name,
          providerName: provider.name,
          description: component.description,
          status: statuspageStatusMap[component.status].id,
          statusText: statuspageStatusMap[component.status].text
        };
      });
    } else if (provider.type == "cachet") {
      /** https://docs.cachethq.io/docs/component-statuses */

      provider.services = _.map(json.data, function(component) {
        return {
          id: component.name + "||" + provider.name,
          name: component.name,
          providerName: provider.name,
          description: component.description,
          status: cachetStatusMap[component.status].id,
          statusText: cachetStatusMap[component.status].text
        };
      });
    }
  };

  /**
   * Composes status API URL based on provider type
   */
  this.getURL = function(provider) {
    var suffix =
      provider.type == "statuspage"
        ? "/api/v2/summary.json"
        : "/api/v1/components";
    return provider.url + suffix;
  };
}
