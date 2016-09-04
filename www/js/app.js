(function() {

var app = angular.module('erp', ['ionic', 'erp.bancoerp', 'ngCordova']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('listaproduto', {
    url: '/listaproduto',
    templateUrl: 'templates/listarProduto.html',
    controller: 'listaProdutoControle'
  });

  $stateProvider.state('novoproduto', {
    url: '/novoproduto',
    templateUrl: 'templates/editarProduto.html',
    controller: 'novoProdutoControle'
  });

  $stateProvider.state('editarproduto', {
    url: '/editarproduto/:produtoId',
    templateUrl: 'templates/editarProduto.html',
    controller: 'editarProdutoControle'
  });

  $urlRouterProvider.otherwise('/listaproduto');
});

app.controller('listaProdutoControle', function($scope, Bancoerp) {

  $scope.reordering = false;
  $scope.produtos = Bancoerp.list();

  $scope.remove = function(produtoId) {
    Bancoerp.remove(produtoId);
  };

  $scope.move = function(produto, fromIndex, toIndex) {
    Bancoerp.move(produto, fromIndex, toIndex);
  };

  $scope.toggleReordering = function() {
    $scope.reordering = !$scope.reordering;
  };

});

app.controller('novoProdutoControle', function($scope, $state, Bancoerp, $cordovaBarcodeScanner) {

  $scope.produto = {
    id: new Date().getTime().toString(),
    nome: '',
    codigoBarra: '',
    descricao: '',
    preco: '',
    dt_cadastro: ''
  };

  $scope.save = function() {
    Bancoerp.create($scope.produto);
    $state.go('listaproduto');
  };

  $scope.getBarcode = function () {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.produto.codigoBarra = imageData.text;
        }, function(error) {
            console.log("An error happened -> " + error);
        });
  };
});

app.controller('editarProdutoControle', function($scope, $state, Bancoerp, $cordovaBarcodeScanner) {

  $scope.produto = angular.copy(Bancoerp.get($state.params.produtoId));

  $scope.save = function() {
    Bancoerp.update($scope.produto);
    $state.go('listaproduto');
  };

  $scope.getBarcode = function () {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.produto.codigoBarra = imageData.text;
        }, function(error) {
            console.log("An error happened -> " + error);
        });
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());
