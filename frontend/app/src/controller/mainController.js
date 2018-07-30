var MainController = (function(){
    function MainController($scope){
        this.$scope = $scope;
        this.hotelsList = [];        
    }

    return MainController;
})();


angular.module('app').controller('mainController', MainController)