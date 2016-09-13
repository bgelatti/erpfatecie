angular.module('erp.produtoService', [])
  .service('produtoService', function(baseService){
    var url = 'http://localhost:8084/erpfatecie-api/api/produto';

    this.save = save;
    this.getList = getList;
    this.getById = getById;
    this.deleteById = deleteById;

    function getList() {
        return baseService.get(url);
    };

    function save(produto) {
        return baseService.post(url, produto);
    };

    function deleteById(id) {
        return baseService.delete(url + '/' + id);
    };

    function getById(id) {
        return baseService.get(url + '/' + id);
    }
});
