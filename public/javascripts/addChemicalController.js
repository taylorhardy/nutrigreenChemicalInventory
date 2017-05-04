(function () {
	angular
		.module('app')
		.controller('addChemicalController', addChemicalController)

	addChemicalController.$inject = ['$http', '$location', 'dataService'];

	function addChemicalController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.currentUser = {};
		vm.services = [];

		function getServices(){
			$http.get('/getServices', {}).then(function (data) {
				vm.services = data.data;
				console.log(vm.services);
			});
		}

		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
				getServices();
			});
		}

		vm.addChemical = function(){
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
