//gets the yahoo data
(function () {
  'use strict';

  angular
    .module('youngStockMoneyApp')
    .factory("yahooFinanceService", yahooFinanceService);

  yahooFinanceService.$inject = ["$log", "$http"];

  function yahooFinanceService($log, $http){
    $log.info("yahoo finance is loaded!");
    var apiUrl = 'http://finance.yahoo.com/d/quotes.csv?s=';
    var stockInfo = "&f=nsabc";
    // var stockName = "n";
    // var stockSymbol = "s";
    // var stockAsk = "a";
    // var stockBid = "b";
    // var stockPercentChange = "c";

    return {
      index: index
    }

    // Gets stock from the api
    function index(symbol) {
      return $http.get(apiUrl + symbol + '&f=nsabc')
    }


  }
  })();
