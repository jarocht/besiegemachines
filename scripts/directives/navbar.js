app.directive('navbar', function () {
	return {
		resrict : 'EA',
		templateUrl : 'partials/navigation.html',
		controller : 'navbarCtrl'

	}
});
app.controller('navbarCtrl', function ($scope, $firebase, $firebaseAuth, $modal, $log, $cookies, $location, Machine, firebaseService, Auth) {
	
	
	$scope.machine = {T:'Test Tile',DE:'Description'};
	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;
	$scope.user = Auth.user;
	

	$scope.restoreSession = function () {
		if ($cookies.token) {
			Auth.login($cookies.token);
		}
	}
	$scope.restoreSession();

	$scope.openLogin = function () {
		var modalInstance = $modal.open({
				templateUrl : 'partials/loginModal.html',
				controller : 'loginModalCtrl'

			});

		modalInstance.result.then(function (Data) {

			$scope.user = Data;

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

});
