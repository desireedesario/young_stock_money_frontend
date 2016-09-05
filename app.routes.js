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
        templateUrl: "/templates/home.html"
      })
      .state("signin", {
        url:          "/signin",
        templateUrl:  "/templates/signin.html",
        controller:   "SignInController",
        controllerAs: "vm"
      })
      .state("portfolioItem", {
        url:         "/portfolioItem",
        templateUrl: "/templates/portfolioItem.html"
        // controller: "portfolioItemController",
        // controllerAs: "itemCtrl"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
