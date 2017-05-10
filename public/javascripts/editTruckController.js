(function () {
	angular
		.module('app')
		.controller('editTruckController', editTruckController)

	editTruckController.$inject = ['$http', '$location', 'dataService'];

	function editTruckController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.defaultUser = [];
		vm.equipmentAssigned = [];
		vm.currentUser = {};

		function getUsers() {
			$http.get('/getUsers', {}).then(function (data) {
				vm.users = data.data;
				console.log(vm.users);
			});
		}

		function getTrucks() {
			$http.get('/getTrucks', {}).then(function (data) {
				vm.trucks = data.data;
				console.log(vm.trucks);
			});
		}

		function getEquipment() {
			$http.get('/getEquipment', {}).then(function (data) {
				vm.equipment = data.data;
			});
		}

		function init() {
			dataService.getCurrentUser().then(function (data) {
				vm.currentUser = data;
			});
			getTrucks();
			getUsers();
			getEquipment();
		}

		vm.addEquipment = function () {
			vm.equipmentAssigned = $filter('filter')(vm.equipment, {checked: true});
			console.log(vm.equipmentAssigned);
		};

		vm.populateFields = function () {
				for (var i = 0; i < vm.trucks.length; i++) {
					vm.equipment[i].checked = false;
					if (vm.trucks[i].name === vm.name) {
						vm.defaultUser = vm.trucks[i].defaultUser;
						vm.active = vm.trucks[i].active;
						for (var j = 0; j < vm.equipment.length; j++) {
							for (var k = 0; k < vm.trucks[i].equipmentAssigned.length; k++) {
								console.log("equipment", vm.equipment[j].id, "equipmentAssigned", vm.trucks[i].equipmentAssigned[k].id);
								if (vm.equipment[j].id === vm.trucks[i].equipmentAssigned[k].id) {
									vm.equipment[j].checked = true;
								}
							}
						}
					}
				}
				console.log(vm.equipment);
		};

		vm.editTruck = function () {
			$http.post('/editTruck', {
				name: vm.name,
				defaultUser: vm.defaultUser,
				lastModifiedUser: vm.currentUser.name,
				lastModifiedDate: Date(),
				active: vm.active,
				equipmentAssigned: []
			}).then(function (data) {
				getTrucks();
				getEquipment()
				vm.name = "";
				vm.defaultUser = "";
				vm.addedBy = "";
				vm.active = false;
				vm.equipmentAssigned = [];
			}, function (response) {
				alert(vm.name + " Not Found. To add a new truck please click on 'Add Truck' on the left hand menu.");
				getEquipment();
				vm.name = "";
				vm.defaultUser = "";
				vm.equipmentAssigned = [];
			});
		};
		init();
	};
})();
