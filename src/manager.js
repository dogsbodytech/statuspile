import _ from "underscore";

/**
 * Takes care of all active services & provide store for current active services
 */

export default function() {
  var self = this;
  this.activeServices = [];

  /**
   * Loads active services from localStorage
   */
  this.loadActiveServices = function() {
    var services = JSON.parse(localStorage.getItem("services"));
    if (services) {
      _.each(services, service => {
        self.activeServices.push(service);
      });
    }
  };

  /**
   * Add new servie to current active services & updates localStorage
   */
  this.addActiveService = function(service) {
    self.activeServices.push(service);
    localStorage.setItem("services", JSON.stringify(self.activeServices));
  };

  /**
   * Remove service from active services & updates localStorage for the same
   */
  this.removeActiveService = function(service) {
    var activeService = _.find(self.activeServices, { id: service.id });
    var index = self.activeServices.indexOf(activeService);
    self.activeServices.splice(index, 1);
    localStorage.setItem("services", JSON.stringify(self.activeServices));
  };

  /**
   * Checks whether given service is currently active or not
   */
  this.isActive = function(service) {
    return _.find(self.activeServices, { id: service.id });
  };
}
