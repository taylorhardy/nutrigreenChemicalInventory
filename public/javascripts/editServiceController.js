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
			console.log("this Ran");
			for(var i = 0; i < vm.services.length; i++){
				if (vm.services[i].name === vm.name){
					console.log(vm.services[i]);
					vm.description = vm.services[i].description;
				}
			}
		};
		vm.editService = function(){
			$http.post('/editService', {
				name: vm.name,
				description: vm.description
			}).then(function () {
				getServices();
				vm.name = "";
				vm.description = "";
			});
		};
		init();
	};
})();
