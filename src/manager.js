import _ from "underscore";

/**
 * Takes care of all active services & provide store for current active services
 */

export default function() {
  var self = this;
  this.activeServices = [];

  /**
   * Loads active services from user_metadata
   */
  this.loadActiveServices = function() {
    // var services = Assign services from user_metadata;
    // if (services) {
    //   _.each(services, service => {
    //     self.activeServices.push(service);
    //   });
    //   self.sortActiveServices();
    // }
  };

  this.sortActiveServices = function() {
    self.activeServices = _.sortBy(self.activeServices, function(service) {
      return service.providerName + service.name;
    });
  };

  /**
   * Add new servie to current active services
   */
  this.addActiveService = function(service) {
    self.activeServices.push(service);
    self.sortActiveServices();
    self.updateUserMetaData();
  };

  /**
   * Remove service from active services
   */
  this.removeActiveService = function(service) {
    var activeService = _.find(self.activeServices, { id: service.id });
    var index = self.activeServices.indexOf(activeService);
    self.activeServices.splice(index, 1);
    self.updateUserMetaData();
  };

  /**
   * updates user_metadata with current active services
   */
  this.updateUserMetaData = function() {
    //todo : Patch user_metadata object with self.activeServices
  };

  /**
   * Checks whether given service is currently active or not
   */
  this.isActive = function(service) {
    return _.find(self.activeServices, { id: service.id });
  };
}
