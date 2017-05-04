(function () {
	angular
		.module('app')
		.controller('addServiceController', addServiceController)

	addServiceController.$inject = ['$http', '$location', 'dataService'];

	function addServiceController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.currentUser = {};
		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
			});
		};

		vm.addService = function(){
			$http.post('/addService', {
				name: vm.name,
				description: vm.description
			}).then(function () {
				vm.name = "";
				vm.description = "";
			});
		};
		init();
	};
})();
