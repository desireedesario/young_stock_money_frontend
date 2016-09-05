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
        url:    'http://localhost:3000/users',
        data:   data
      });

      return promise;
    }
  }

  //   function update(data) {
  //     var promise: $http({
  //       method: 'PATCH',
  //       url: '/api/users/:id'
  //     });
  //
  //     return promise;
  // }
  //
  // function destroy(data) {
  //   var promise: $http({
  //     method: 'DELETE',
  //     url: '/api/users/:id'
  //   });
  //   return promise;
  // }
})();
