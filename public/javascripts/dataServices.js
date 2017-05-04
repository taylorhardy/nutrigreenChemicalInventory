(function () {
	angular
		.module('app')
		.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {

		var currentUser;

		var service = {
			getCurrentUser: getCurrentUser,
			currentUser: currentUser,
			addChemical: addChemical
		};
		return service;

		function getCurrentUser() {
			return $http({
				method: 'GET',
				url: '/currentUser'
			}).then(function (data) {
				currentUser = data.data.local;
				return currentUser;
			});

		}

		function addChemical(chemical) {
			return $http.post('/addChemical', {
				chemical: chemical

			}).then(function (data) {
				return data;
			});
		};
	}

})();