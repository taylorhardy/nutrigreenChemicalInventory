(function () {
	angular
		.module('app')
		.controller('editEquipmentController', editEquipmentController);

	editEquipmentController.$inject = ['$http', '$location', 'dataService'];

	function editEquipmentController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.id = "";
		vm.currentUser = {};

		function getEquipment(){
			$http.get('/getEquipment', {}).then(function(data){
				vm.equipment = data.data;
				console.log(vm.equipment);
			});
		}
		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
				getEquipment();
			});
		}
		vm.populateFields = function(){
			console.log("this Ran");
			for(var i = 0; i < vm.equipment.length; i++){
				if (vm.equipment[i].name === vm.name){
					vm.description = vm.equipment[i].description;
					vm.id = vm.equipment[i].id;
					vm.active = vm.equipment[i].active;
				}
			}
		};

		vm.editEquipment = function(){
			$http.post('/editEquipment', {
				name: vm.name,
				description: vm.description,
				id: vm.id,
				dateAdded: Date(),
				active: true
			}).then(function (data) {
				alert("Equipment Successfully Edited");
				vm.name = "";
				vm.description = "";
				vm.id = "";
			},function(response){
				alert("Equipment with ID: " + vm.id + " not found. To add new equipment click on the 'Add New Equipment' button on the left hand menu");
				vm.name = "";
				vm.description = "";
				vm.id = "";
			});
		};
		init();
	}
})();
