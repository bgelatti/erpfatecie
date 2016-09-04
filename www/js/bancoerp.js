angular.module('erp.bancoerp', [])
	.factory('Bancoerp', function() {

	  var produtos = angular.fromJson(window.localStorage['produtos'] || '[]');

	  function persist() {
	  	window.localStorage['produtos'] = angular.toJson(produtos);
	  }

	  return {

	    list: function() {
	      return produtos;
	    },

	    get: function(produtoId) {
	      for (var i = 0; i < produtos.length; i++) {
	        if (produtos[i].id === produtoId) {
	          return produtos[i];
	        }
	      }
	      return undefined;
	    },

	    create: function(produto) {
	      produtos.push(produto);
	      persist();
	    },

	    update: function(produto) {
	      for (var i = 0; i < produtos.length; i++) {
	        if (produtos[i].id === produto.id) {
	          produtos[i] = produto;
	          persist();
	          return;
	        }
	      }
	    },

	    move: function(produto, fromIndex, toIndex) {
	    	produtos.splice(fromIndex, 1);
	    	produtos.splice(toIndex, 0, produto);
	    	persist();
	    },

	    remove: function(produtoId) {
	      for (var i = 0; i < produtos.length; i++) {
	        if (produtos[i].id === produtoId) {
	          produtos.splice(i, 1);
	          persist();
	          return;
	        }
	      }
	    }

	  };

	});
