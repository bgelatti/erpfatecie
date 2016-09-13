(function() {

var app = angular.module('erp', ['ionic', 'erp.bancoerp', 'ngCordova',
  'erp.produtoService', 'erp.baseService']);

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

app.controller('listaProdutoControle', function($scope, Bancoerp, produtoService) {

  $scope.reordering = false;
  produtoService.getList().then(function (data) {
      $scope.produtos = data.data.values;
  });

  $scope.remove = function(produtoId) {
    produtoService.deleteById(produtoId).then(function () {
        produtoService.getList().then(function (data) {
            $scope.produtos = data.data.values;
        });
    });
  };

  $scope.move = function(produto, fromIndex, toIndex) {
    Bancoerp.move(produto, fromIndex, toIndex);
  };

  $scope.toggleReordering = function() {
    $scope.reordering = !$scope.reordering;
  };

});

app.controller('novoProdutoControle', function($scope, $state, Bancoerp, $cordovaBarcodeScanner,
  produtoService) {

  $scope.produto = {
    nome: '',
    codigoBarra: '',
    descricao: '',
    preco: '',
    dt_cadastro: ''
  };

  $scope.save = function() {
    produtoService.save($scope.produto).then(function () {
        $state.go('listaproduto');
    });
  };

  $scope.getBarcode = function () {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.produto.codigoBarra = imageData.text;
        }, function(error) {
            console.log("An error happened -> " + error);
        });
  };
});

app.controller('editarProdutoControle', function($scope, $state, Bancoerp,
  $cordovaBarcodeScanner, produtoService) {

  produtoService.getById($state.params.produtoId).then(function (data) {
      $scope.produto = data.data;
  });

  $scope.save = function() {
    produtoService.save($scope.produto).then(function () {
        $state.go('listaproduto');
    });
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
