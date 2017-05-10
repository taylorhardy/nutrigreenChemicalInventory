(function () {
	angular
		.module('app')
		.controller('addChemicalController', addChemicalController);

	addChemicalController.$inject = ['$http', '$location', 'dataService', '$filter'];

	function addChemicalController($http, $location, dataService, $filter) {
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

		vm.addService = function(){
			vm.servicesAssigned = $filter('filter')(vm.services, {checked: true});
			console.log(vm.servicesAssigned);
		};

		vm.addChemical = function(){
			$http.post('/addChemical', {
				name: vm.name,
				type: vm.type,
				price: vm.price,
				mixUnit: vm.mixUnit,
				mixPerUnit: vm.mixPerUnit,
				amountUnit: vm.amountUnit,
				amountPerUnit: vm.amountPerUnit,
				services: vm.servicesAssigned
			}).then(function () {
				getServices();
				vm.name = "";
				vm.type = "";
				vm.price = "";
				vm.mixUnit = "";
				vm.mixPerUnit = "";
				vm.amountUnit = "";
				vm.amountPerUnit = "";
				vm.servicesAssigned = []
			},function(response){
				alert(vm.name + " Already Exists. To Edit Existing Chemicals please click on 'Edit Chemical' on the left hand menu.");
				getServices();
				vm.name = "";
				vm.type = "";
				vm.price = "";
				vm.mixUnit = "";
				vm.mixPerUnit = "";
				vm.amountUnit = "";
				vm.amountPerUnit = "";
				vm.servicesAssigned = []
			});
		};
		init();
	};
})();
