(function () {
	angular
		.module('app')
		.controller('editChemicalController', editChemicalController)

	editChemicalController.$inject = ['$http', '$location', 'dataService'];

	function editChemicalController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.currentUser = {};
		vm.chemicals = [];

		function getServices(){
			$http.get('/getServices', {}).then(function (data) {
				vm.services = data.data;
			});
		}
		function getChemicals(){
			$http.get('/getChemicals', {}).then(function (data) {
				console.log(data);
				vm.chemicals = data.data;
			});
		}
		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
				getServices();
				getChemicals();
			});
		}
		vm.populateFields = function(){
			console.log("this Ran");
			 for(var i = 0; i < vm.chemicals.length; i++){
			 	if (vm.chemicals[i].name === vm.name){
			 		console.log(vm.chemicals[i].services[0]);
				    vm.type = vm.chemicals[i].type;
				    vm.amountPerUnit = vm.chemicals[i].amountPerUnit;
				    vm.amountUnit = vm.chemicals[i].amountUnit;
				    vm.mixPerUnit = vm.chemicals[i].mixPerUnit;
				    vm.mixUnit = vm.chemicals[i].mixUnit;
				    vm.price = vm.chemicals[i].price;
				    vm.service = vm.chemicals[i].services;
				    vm.active = vm.chemicals[i].active
			    }
			 }
		};
		vm.editChemical = function(){
			$http.post('/editChemical', {
				name: vm.name,
				type: vm.type,
				amountPerUnit: vm.amountPerUnit,
				amountUnit: vm.amountUnit,
				mixPerUnit: vm.mixPerUnit,
				price: vm.price,
				service: vm.service,
				active: vm.active
			}).then(function () {
				vm.name = "";
				vm.type = "";
				vm.amountPerUnit = "";
				vm.amountUnit = "";
				vm.mixPerUnit = "";
				vm.mixUnit = "";
				vm.price = "";
				vm.service = "";
				vm.active = false;
			});
		};
		init();
	}
})();
