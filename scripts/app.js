var app = angular.module('app', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies','ngResource'])
.constant('FIREBASE_URL', 'https://besiege.firebaseio.com/');;

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
	$stateProvider
	.state('machines', {
		url : "/machines",
		templateUrl : "partials/machines.html",
		controller : "MachinesCtrl"
	});
	
	$stateProvider
	.state('machineView', {
		url : "/machines/:machineId",
		templateUrl : "partials/showmachine.html",
		controller : "MachineViewCtrl"
	});
	
	$stateProvider
	.state('register', {
		url : "/register",
		templateUrl : "partials/register.html",
		controller : "AuthCtrl",
		resolve: {
			user: function(Auth){
				return Auth.resolveUser();
			}
		}
	});
});

app.controller('homeCtrl', function ($scope) {});



app.controller('profileCtrl', function ($scope, $stateParams) {
	$scope.id = $stateParams.profileId;

});

app.service('firebaseService', function ($firebase) {
	firebaseService = this;
	firebaseService.ref = new Firebase(firebaseURL);
	firebaseService.sync = $firebase(firebaseService.ref);

});
