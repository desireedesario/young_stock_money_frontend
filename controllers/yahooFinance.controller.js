(function() {
'use strict';

angular
  .module('youngStockMoneyApp')
  .controller('YahooFinanceController', YahooFinanceController);

YahooFinanceController.$inject = ['$http', 'yahooFinanceService', 'tokenService', '$state']

function YahooFinanceController($http, yahooFinanceService, tokenService, $state) {
  //GLOBAL VARIABLES
  var vm = this;
  vm.symbol = "";
  vm.data = "";
  vm.results = [];
  vm.currentUser = {};
  vm.getUserStocks = getUserStocks;
  vm.getQuote = getQuote;
  vm.getTop100 = getTop100;
  vm.buyStock = buyStock;
  vm.sellStock = sellStock;

  //GETS A SINGLE QUOTE AT THE TOP OF THE PAGE
  function getQuote() {
    console.log('getQuote running')
    yahooFinanceService.index(vm.symbol)
      .success(function(data) {
        vm.data = data;
      });
  }

  //USER BUYS STOCK
  function buyStock(stock) {
    console.log('You are going to buy ' + stock.name);
    var portfolioItem = {
      stockName: stock.name,
      stockTicker: stock.symbol,
      shares: stock.shares,
      purchasePrice: stock.bid
    };

    $http
      .post('https://young-stock-money-api.herokuapp.com/portfolioitems/', portfolioItem, {headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.retrieve()
      }})
      .success(function(resp) {
        if(resp.message) {
          alert(resp.message)
        } else {
          $state.go('portfolio')
        }
      })
  };

  //USER SELLS STOCK
  function sellStock(portItem) {

    var sellingStock = vm.results.filter(function(stock){
      return portItem.stockName == stock.name
    })
    console.log(sellingStock[0].bid);
    console.log('You are going to sell ' + portItem.stockName);
    var sharesSold = {
      currentPrice: sellingStock[0].bid,
      sharesSold: portItem.sellNumber
    };

    $http
      .put('https://young-stock-money-api.herokuapp.com/portfolioitems/' + portItem._id, sharesSold,
      {headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenService.retrieve()
      }})
      .success(function(resp) {
        vm.currentUser = resp;
      })
  };

  //GETTING ALL STOCKS IN SYMBOLS
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

  //||||||||||||||||||||||||||
  //  PORTFOLIO HTML PAGE
  //||||||||||||||||||||||||||

  //GRABBING THE USER TO ASSIGN TO A STOCKPORTFOLIO
  function getUser() {
    console.log("trying to get user")
    $http
      .get('https://young-stock-money-api.herokuapp.com/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.retrieve()
        }
      }).then(
        function(res) {
          vm.currentUser = res.data.data;
          console.log(vm.currentUser)
        },
        function(err) {
          console.log(err)
        }
      )
  }
  getUser()

  //AFTER GRABBING USER, GRAB STOCKS OF CURRENT USER
  function getUserStocks(user){
    $http
    .get('https://young-stock-money-api.herokuapp.com/portfolioitems')
    .success(function(stock) {
      return portfolioitems;
    })
  }
} //end of controller
})();
