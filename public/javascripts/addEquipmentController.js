(function () {
	angular
		.module('app')
		.controller('addEquipmentController', addEquipmentController);

	addEquipmentController.$inject = ['$http', '$location', 'dataService'];

	function addEquipmentController($http, $location, dataService) {
		var vm = this;
		vm.name = "";
		vm.description = "";
		vm.currentUser = {};


		function init(){
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
			});
		}

		vm.addEquipment = function(){
			$http.post('/addEquipment', {
				name: vm.name,
				description: vm.description,
				id: vm.id,
				addedBy: vm.currentUser.name,
				dateAdded: Date(),
				active: true
			}).then(function (data) {
				vm.name = "";
				vm.description = "";
				vm.id = "";
			},function(response){
				alert("Equipment with ID: " + vm.id + " Already Exists. To Edit Existing Equipment please click on 'Edit Equipment' on the left hand menu.");
				vm.name = "";
				vm.description = "";
				vm.id = "";
			});
		};
		init();
	}
})();
