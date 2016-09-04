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
      .state("portfolioItem", {
        url:         "/portfolioItem",
        templateUrl: "templates/portfolioItem.html"
        // controller: "portfolioItemController",
        // controllerAs: "itemCtrl"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
