(function() {
	'use strict';

	angular
		.module('app')
		.config(config);

	function config($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'partials/home.html',
				controller: 'homeController',
				controllerAs: 'vm'
			})
			.when('/viewInventory', {
				templateUrl: 'partials/viewInventory.html',
				controller: 'inventoryController',
				controllerAs: 'vm'
			})
			.when('/addInventory', {
				templateUrl: 'partials/addInventory.html',
				controller: 'addInventoryController',
				controllerAs: 'vm'
			})
			.when('/addChemical', {
				templateUrl: 'partials/addChemical.html',
				controller: 'addChemicalController',
				controllerAs: 'vm'
			})
			.when('/editChemical', {
				templateUrl: 'partials/editChemical.html',
				controller: 'editChemicalController',
				controllerAs: 'vm'
			})
			.when('/addService', {
				templateUrl: 'partials/addService.html',
				controller: 'addServiceController',
				controllerAs: 'vm'
			})
			.when('/editService', {
				templateUrl: 'partials/editService.html',
				controller: 'editServiceController',
				controllerAs: 'vm'
			})
			.when('/addTruck', {
				templateUrl: 'partials/addTruck.html',
				controller: 'addTruckController',
				controllerAs: 'vm'
			})
			.when('/editTruck', {
				templateUrl: 'partials/editTruck.html',
				controller: 'editTruckController',
				controllerAs: 'vm'
			})
			.when('/logUsage', {
				templateUrl: 'partials/logUsage.html',
				controller: 'logUsageController',
				controllerAs: 'vm'
			})
			.when('/reportIssue', {
				templateUrl: 'partials/reportIssue.html',
				controller: 'reportIssueController',
				controllerAs: 'vm'
			})
			.when('/resetUserPassword', {
				templateUrl: 'partials/resetUserPassword.html',
				controller: 'resetUserPasswordController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/home'
			});
	}
})();
