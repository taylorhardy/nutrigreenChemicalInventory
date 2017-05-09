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
		var chemical = {
			name: "String",
			type: "String",
			price: 0,
			mixUnit: "String",
			mixPerUnit: 0,
			amountUnit: "String",
			amountPerUnit: 0,
			dateAdded: Date(),
			active: true,
			lastModifiedUser: "String",
			lastModifiedDate: Date(),
			services: [{
				name: "String",
				description: "String"
			}]
		};

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
			$http.post('/addChemical', chemical).then(function () {
				vm.name = "";
				vm.type = "";
			},function(response){
				alert(vm.name + " Already Exists. To Edit Existing Chemicals please click on 'Edit Chemical' on the left hand menu.");
				vm.name = "";
				vm.type = "";
			});
		};
		init();
	};
})();
