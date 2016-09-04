(function() {
  "use strict";

  angular
    .module("youngStockMoneyApp")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"];

  function appRoutes($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state("welcome", {
        url:         "/",
        templateUrl: "templates/welcome.html"
      })
      .state("signin", {
        url:          "/signin",
        templateUrl:  "templates/signin.html",
        controller:   "SignInController",
        controllerAs: "signInCtrl"
      })
      .state("profile", {
        url:         "/profile",
        templateUrl: "templates/profile.html"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
