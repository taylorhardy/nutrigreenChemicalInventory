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

		function getUsers(){
			$http.get('/getUsers', {}).then(function (data) {
				vm.users = data.data;
				console.log(vm.users);
			});
		}
		function getTrucks(){
			$http.get('/getTrucks', {}).then(function (data) {
				vm.trucks = data.data;
				console.log(vm.trucks);
			});
		}

		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
			});
			getTrucks();
			getUsers();
		}

		vm.populateFields = function(){
			for(var i = 0; i < vm.trucks.length; i++){
				if (vm.trucks[i].name === vm.name){
					vm.defaultUser = vm.trucks[i].defaultUser;
					vm.active = vm.trucks[i].active;
					vm.equipmentAssigned = vm.trucks[i].equipmentAssigned;
				}
			}
		};

		vm.editTruck = function(){
			$http.post('/editTruck', {
				name: vm.name,
				defaultUser: vm.defaultUser,
				lastModifiedUser: vm.currentUser.name,
				lastModifiedDate: Date(),
				active: vm.active,
				equipmentAssigned: []
			}).then(function (data) {
				getTrucks();
				vm.name = "";
				vm.defaultUser = "";
				vm.addedBy = "";
				vm.active = false;
				vm.equipmentAssigned = [];
			});
		};
		init();
	};
})();
