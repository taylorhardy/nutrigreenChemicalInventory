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

		vm.addService = function(){
			vm.servicesAssigned = $filter('filter')(vm.services, {checked: true});
			console.log(vm.servicesAssigned);
		};

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
				    vm.active = vm.chemicals[i].active;

				    for (var j = 0; j < vm.services.length; j++) {
					    for (var k = 0; k < vm.chemicals[i].services.length; k++) {
						    if (vm.services[j].name === vm.chemicals[i].services[k].name) {
							    vm.services[j].checked = true;
						    }
					    }
				    }

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
				getServices();
				vm.name = "";
				vm.type = "";
				vm.amountPerUnit = "";
				vm.amountUnit = "";
				vm.mixPerUnit = "";
				vm.mixUnit = "";
				vm.price = "";
				vm.service = "";
				vm.active = false;
			},function(response){
				alert(vm.name + " Not Found. To add new chemicals please click on 'Add Chemical' on the left hand menu.");
				getServices();
				vm.name = "";
				vm.type = "";
				vm.amountPerUnit = "";
				vm.amountUnit = "";
				vm.mixPerUnit = "";
				vm.mixUnit = "";
				vm.price = "";
				vm.active = false;
			});
		};
		init();
	}
})();
