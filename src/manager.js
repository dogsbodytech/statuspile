import _ from "underscore";
import auth from "./auth/AuthService";

/**
 * Takes care of all active services & provide store for current active services
 */

export default function() {
  var self = this;
  this.activeServices = [];

  /**
   * Initializes the manager
   */
  this.init = function() {
    this.listenToAuth();
  };

  /**
   * Listen to auth event to populate active serves based on user context
   */
  this.listenToAuth = function() {
    auth.authNotifier.on("authChange", authContext => {
      if (authContext) {
        var services = JSON.parse(localStorage.getItem("activeServices"));
        this.handleActiveServices(authContext, services);
        localStorage.removeItem("activeServices");
      }
    });
  };

  /**
   * Populates current active services from user metadata
   */
  this.loadServicesFromMetaData = function(metaServices) {
    self.activeServices = [];
    _.each(metaServices, service => {
      var parts = service.split("||");
      self.activeServices.push({
        id: service,
        name: parts[0],
        providerName: parts[1]
      });
    });
    self.sortActiveServices();
  };

  /**
   * Handle active services based on auth context & given services
   */
  this.handleActiveServices = function(authContext, localServices) {
    if (authContext && authContext.user.user_metadata && authContext.user.user_metadata.active_services && authContext.user.user_metadata.active_services.length) {
      this.loadServicesFromMetaData(authContext.user.user_metadata.active_services);
    } else if (localServices && localServices.length) {
      self.activeServices = localServices;
      self.updateUserMetaData();
    }
  };

  /**
   * Sorts active services based on service provider & service name
   */
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
    var activeMetaServices = _.pluck(self.activeServices, "id");
    auth.updateUserActiveServices(activeMetaServices);
  };

  /**
   * Checks whether given service is currently active or not
   */
  this.isActive = function(service) {
    return _.find(self.activeServices, { id: service.id });
  };
}
