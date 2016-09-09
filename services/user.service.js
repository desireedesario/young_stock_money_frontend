//gets the user, updates the user

(function () {
  'use strict';

  angular
    .module('youngStockMoneyApp')
    .factory("userService", userService);

  userService.$inject = ["$log", "$http"];

  function userService($log, $http) {
    $log.info("user service is loaded!");

    var service = {
      create: create
      // update: update,
      // destroy: destroy
    };
    return service;

    function create(data) {
      var promise = $http({
        method: 'POST',
        url:    'https://young-stock-money-api.herokuapp.com/users',
        data:   data
      });

      return promise;
    }

  //   function update(data) {
  //     var promise: $http({
  //       method: 'PATCH',
  //       url: 'https://young-stock-money-api.herokuapp.com/users'
  //     });
  //
  //     return promise;
  // }
  //
  // function destroy(data) {
  //   var promise: $http({
  //     method: 'DELETE',
  //     url: 'https://young-stock-money-api.herokuapp.com/users'
  //   });
  //   return promise;
  // }
} //close userService
})();
