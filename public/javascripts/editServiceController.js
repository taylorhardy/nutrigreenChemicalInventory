(function () {
	angular
		.module('app')
		.controller('editServiceController', editServiceController)

	editServiceController.$inject = ['$http', '$location', 'dataService'];

	function editServiceController($http, $location, dataService) {
		var vm = this;
		vm.currentUser = {};
		vm.name = "";
		vm.description = "";

		function getServices(){
			$http.get('/getServices', {}).then(function (data) {
				vm.services = data.data;
			});
		}
		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
				getServices();
			});
		}
		vm.populateFields = function(){
			for(var i = 0; i < vm.services.length; i++){
				if (vm.services[i].name === vm.name){
					console.log(vm.services[i]);
					vm.description = vm.services[i].description;
					vm.active = vm.services[i].active;
				}
			}
		};
		vm.editService = function(){
			$http.post('/editService', {
				name: vm.name,
				description: vm.description,
				active: vm.active
			}).then(function () {
				getServices();
				vm.name = "";
				vm.description = "";
				vm.active = false;
			});
		};
		init();
	};
})();
