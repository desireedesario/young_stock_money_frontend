(function() {
  "use strict";

  angular
    .module("youngStockMoneyApp")
    .controller("SignInController", SignInController);

  SignInController.$inject = ["$log", "authService", "userService", "$state"];

  function SignInController($log, authService, userService, $state) {
    var vm = this;
    vm.authService = authService;

    // BINDINGS
    vm.signUp = {
      email:    "",
      name:     "",
      username: "",
      password: "",
      passwordConfirmation: ""
    };
    vm.submitSignUp = submitSignUp;
    vm.logIn = {
      email:    "",
      password: ""
    };
    vm.submitLogIn = submitLogIn;
    vm.conflict = false;


    // FUNCTIONS
    function submitSignUp() {
      userService
        .create(vm.signUp)
        .then(function(res) {
          return authService.logIn(vm.signUp);
        })
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('home');
          },
          // on error
          function(err) {
            if (err.status === 409) vm.conflict = true;
            $log.info('Error Claire-r:', err);
          }
        );
    }

    function submitLogIn() {
      authService
        .logIn(vm.logIn)
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('home');
          },
          // on error
          function(err) {
            $log.info('Error:', err);
          }
        );
    }

    $log.info("SignInController is loaded!");
  }
})();
