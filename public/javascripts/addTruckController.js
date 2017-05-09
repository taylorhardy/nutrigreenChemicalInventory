(function () {
	angular
		.module('app')
		.controller('addTruckController', addTruckController)

	addTruckController.$inject = ['$http', '$location', 'dataService'];

	function addTruckController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.currentUser = {};

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
			getUsers();
		}

		vm.addTruck = function(){
			$http.post('/addTruck', {
				name: vm.name,
				defaultUser: vm.defaultUser,
				addedBy: vm.addedBy,
				dateAdded: Date(),
				active: true,
				equipmentAssigned: []
			}).then(function () {
				vm.name = "";
				vm.defaultUser = "";
				vm.addedBy = "";
				vm.equipmentAssigned = [];
			});
		};
		init();
	};
})();
