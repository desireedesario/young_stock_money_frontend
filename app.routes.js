(function() {
  "use strict";

  angular
    .module("youngStockMoneyApp")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"];

  function appRoutes($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state("home", {
        url:         "/",
        templateUrl: "./templates/home.html",
        controller: "YahooFinanceController",
        controllerAs: "vm"
      })
      .state("signin", {
        url:          "/signin",
        templateUrl:  "./templates/signin.html",
        controller:   "SignInController",
        controllerAs: "vm"
      })
      .state("portfolio", {
        url:         "/portfolio",
        templateUrl: "./templates/portfolio.html",
        controller: "YahooFinanceController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
