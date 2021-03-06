(function () {
	angular
		.module('app')
		.controller('addTruckController', addTruckController);

	addTruckController.$inject = ['$http', '$location', 'dataService', '$filter'];

	function addTruckController($http, $location, dataService, $filter) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.currentUser = {};
		vm.equipmentAssigned = [];

		function getEquipment(){
			$http.get('/getEquipment', {}).then(function (data) {
				vm.equipment = data.data;
			});
		}

		function getUsers(){
			$http.get('/getUsers', {}).then(function (data) {
				vm.users = data.data;
				console.log(vm.users);
			});
		}

		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
			});
			getEquipment();
			getUsers();
		}


		vm.addEquipment = function(){
			vm.equipmentAssigned = $filter('filter')(vm.equipment, {checked: true});
			console.log(vm.equipmentAssigned);
		};

		vm.addTruck = function(){
			$http.post('/addTruck', {
				name: vm.name,
				defaultUser: vm.defaultUser,
				addedBy: vm.currentUser.name,
				dateAdded: Date(),
				active: true,
				equipmentAssigned: vm.equipmentAssigned
			}).then(function () {
				getEquipment();
				vm.name = "";
				vm.defaultUser = "";
				vm.equipmentAssigned = [];
			},function(response){
				alert(vm.name + " Already Exists. To Edit Existing Trucks please click on 'Edit Truck' on the left hand menu.");
				getEquipment();
				vm.name = "";
				vm.defaultUser = "";
				vm.equipmentAssigned = [];
			});
		};
		init();
	}
})();
