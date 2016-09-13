angular.module('erp.baseService', [])
  .service('baseService', function($http) {
      this.get = function(url, params){
          return $http.get(url, params);
      };
      this.post = function(url, params){
          return $http.post(url, params);
      };
      this.put = function(url, params){
          return $http.put(url, params);
      };
      this.delete = function(url, params){
          return $http.delete(url, params);
      };
});
