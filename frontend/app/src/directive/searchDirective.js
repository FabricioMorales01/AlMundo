(function(app){
    var SearchController = (function(){
        function SearchController($scope, HotelService, $window){
            var self = this;
            this.$scope = $scope;
            this.HotelService = HotelService;
            this.isFinish = false;
            this.filter = {
                name: '',
                stars: 0,
                page: 0
            }
            this.hotelsList = null;  
            this.search();

            //inicializa evento scroll de la ventana
            angular.element($window).bind("scroll", function() {
                
                //vuelve a llamaar el la búsqueda si scroll alcanza la parte inferior
                if (this.pageYOffset + this.innerHeight > document.body.scrollHeight - 100) {     
                    self.search();
                } 
                $scope.$apply();
            });
        }

        SearchController.prototype.search = function(reset){
            var self = this;
            //no permite hacer 2 peticiones simultaneas
            //se evita un llamado cuando la consulta no vuelve más resultados
            if(self.isLoading || (!reset && self.isFinish)){
                return;
            }

            //se reinicia valores por defecto
            if(reset){
                self.hotelsList = [];  
                self.filter.page = 0;
                self.isFinish = false;
            }
            
            self.HotelService.filterHotel({
                filter: self.filter,
                success: function(hotels){
                    self.hotelsList = self.hotelsList.concat(hotels);
                    
                    //si la consulta trae vacio, no se sige paginando
                    if(hotels.length == 0){
                        self.isFinish = true;
                    }else{
                        self.filter.page++;
                    }                    
                },
                beforeSend: function(){
                    self.isLoading = true;
                },
                complete: function(){
                    self.isLoading = false;
                }
            });
        }

        return SearchController;
    })();



    app
    .directive('amSearch', [function ($parse) {
        return {
            restrict: 'E',
            templateUrl: 'src/view/directive/search.html',
            scope: {
                hotelsList: '=',
                isLoading: '='
            },
            controller: SearchController,
            controllerAs: 'ctrl',
            bindToController: true,
        };
    }])
    .filter('range', function () {
        return function (input, min, max, desc) {
            min = parseInt(min); 
            max = parseInt(max);
            if(desc){
                for (var i = max; i >= min; i--)
                    input.push(i);
            }else{
                for (var i = min; i <= max; i++)
                    input.push(i);
            }        
            return input;
        };
    });
})(angular.module('app'));