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
			.otherwise({
				redirectTo: '/home'
			});
	}
})();
