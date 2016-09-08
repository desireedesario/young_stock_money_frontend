(function() {
'use strict';

angular
  .module('youngStockMoneyApp')
  .controller('YahooFinanceController', YahooFinanceController);

YahooFinanceController.$inject = ['$http', 'yahooFinanceService', 'tokenService']

function YahooFinanceController($http, yahooFinanceService, tokenService) {
  var vm = this;
  vm.symbol = "";
  vm.data = "";
  vm.results = [];
  vm.getQuote = getQuote;
  vm.getTop100 = getTop100;
  vm.buyStock = buyStock

  function buyStock(stock) {
    console.log('You want to buy ' + stock.name);
    var portfolioItem = {
      stockName: stock.name,
      stockTicker: stock.symbol,
      shares: stock.shares,
      purchasePrice: stock.bid,
      user: tokenService.decode()._id
    };

    $http
      .post('http://localhost:3000/portfolioitems', portfolioItem)
      .success(function() {
      })
  }

  function getQuote() {
    console.log('getQuote running')
    yahooFinanceService.index(vm.symbol)
      .success(function(data) {
        // data.split("","")
        vm.data = data;
        console.log(data);
      })
  }

  //getting all stocks in symbols
  function getTop100() {
    var symbols = ['GOOG','EA','GME','CHK','F','BABA','GE','ENB']
      for(var i = 0; i < symbols.length; i++) {
        yahooFinanceService.index(symbols[i])
        .then(function(data){
          //cuts my comma
          var newData = data.data.split(",")
          for (var i = 0; i < newData.length; i++) {
            //takes out ""
            newData[i] = newData[i].replace(/^"(.*)"$/, '$1')
          }
          //cuts each data into variables
          var dataObj = {
            name: newData[0],
            symbol: newData[1],
            ask: parseFloat(newData[2]),
            bid: parseFloat(newData[3]),
            percentChange: newData[4]
          }
          vm.results.push(dataObj)
        })
      }
    return vm.results;
  }
  console.log(vm.getTop100());
  }
})();
