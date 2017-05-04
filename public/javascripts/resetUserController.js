(function () {
	angular
		.module('app')
		.controller('resetUserPasswordController', resetUserPasswordController)

	resetUserPasswordController.$inject = ['$http', '$location', 'dataService'];

	function resetUserPasswordController($http, $location, dataService) {
		var vm = this;
		vm.currentUser = {};
		vm.user = "";
		vm.newPassword = "";
		vm.users = [];
		function init(){
			console.log(dataService.getCurrentUser());
			dataService.getCurrentUser().then(function(data){
				vm.currentUser = data;
				if (vm.currentUser.isAdmin){
					$http.get('/getUsers', {}).then(function (data) {
						vm.users = data.data;
						console.log(vm.users);
					});
				} else{
					$location.path('/logout');
				}
			});

		};

		vm.resetUserPassword = function(){
			if (vm.currentUser.isAdmin){
				$http.post('/resetPassword', {
					email: vm.user,
					password: vm.newPassword
				}).then(function () {
					$location.path('/home');
				});
			} else{
				window.location('/logout');
			}
		};

		init();
	};
})();
