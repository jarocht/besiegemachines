var app = angular.module('app', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /login
	$urlRouterProvider.otherwise("/home");

	// Now set up the states
	$stateProvider
	.state('home', {
		url : "/home",
		templateUrl : "partials/home.html",
		controller : "homeCtrl"
	});

	// Now set up the states
	$stateProvider
	.state('profile', {
		url : "/profile/:profileId",
		templateUrl : "partials/profile.html",
		controller : "profileCtrl"
	});
});

app.controller('homeCtrl', function ($scope) {});

app.directive('navbar', function () {
	return {
		resrict : 'EA',
		templateUrl : 'partials/navigation.html',
		controller : 'navbarCtrl'

	}
});
app.controller('navbarCtrl', function ($scope, $firebase, $firebaseAuth, $modal, $log, $cookies,firebaseService) {
	console.log('Controller is set up');
	$scope.restoreSession = function() {
		if ($cookies.token) {
			// Authenticate users with a custom Firebase token
			firebaseService.ref.authWithCustomToken($cookies.token,
				function (error, authData) {
				if (error) {
					console.log("Login Failed!", error);
					$cookies.token = null;
				} else {
					console.log("Authenticated successfully with payload:", authData);
					$scope.user = authData;
				}
				$scope.$apply();
			});
		}
	}
	$scope.restoreSession();
	$scope.logOut = function () {
		firebaseService.ref.unauth();
		$scope.user = null;
		$cookies.token = null;

	};
	$scope.openLoginSignup = function (type) {
		var modalInstance = $modal.open({
				templateUrl : 'partials/signupModal.html',
				controller : 'signupModalCtrl',
				resolve : {
					modaltype : function () {
						return type;
					}
				}

			});

		modalInstance.result.then(function (Data) {

			$scope.user = Data;

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

});
app.controller('signupModalCtrl', function ($scope, $modalInstance, $firebase, $firebaseAuth, $cookies, firebaseService, modaltype) {

	$scope.signup = modaltype == 'signup';
	$scope.alerts = [];

	$scope.addAlert = function (a_msg, a_type) {
		$scope.alerts.push({
			type : a_type,
			msg : a_msg
		});
		$scope.$apply();

	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	$scope.login = function () {
		if ($scope.email && $scope.password) {
			firebaseService.ref.authWithPassword({
				email : $scope.email,
				password : $scope.password
			}, function (error, authData) {
				if (error) {
					console.log("Login Failed!", error);
					$scope.addAlert(error.message, 'danger');
				} else {
					console.log("Authenticated successfully with payload:", authData);
					$cookies.token = authData.token;
					$modalInstance.close(authData);
				}
			});
		}

	};
	$scope.createUser = function () {

		console.log($scope.email);
		console.log($scope.password);
		if ($scope.email && $scope.password) {
			firebaseService.ref.createUser({
				email : $scope.email,
				password : $scope.password
			}, function (error, userData) {
				if (error) {
					console.log("Error creating user:", error);
					$scope.addAlert(error.message, 'danger');
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					$scope.login();
				}

			});
		}

	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

});
app.controller('signupCtrl', function ($scope, $firebase, $firebaseAuth) {
	var ref = new Firebase(firebaseURL);
	var sync = $firebase(ref);

	$scope.data = sync.$asObject();

});

app.controller('profileCtrl', function ($scope, $stateParams) {
	$scope.id = $stateParams.profileId;

});

app.service('firebaseService', function ($firebase) {
	firebaseService = this;
	firebaseService.ref = new Firebase(firebaseURL);
	firebaseService.sync = $firebase(firebaseService.ref);

});
