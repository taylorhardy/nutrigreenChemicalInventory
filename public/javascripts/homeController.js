(function () {
	angular
		.module('app')
		.controller('homeController', homeController)

	homeController.$inject = ['$http', '$location', 'dataService'];

	function homeController($http, $location, dataService) {
		var vm = this;
		vm.currentUser = {};
		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
			});
		};
		init();
	};
})();
