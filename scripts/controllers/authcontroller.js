app.controller('AuthCtrl', function ($scope, $location, Auth, user) {
	if (user) {
		$location.path('/');
	}
	$scope.alerts = [];

	var addAlert = function (a_msg, a_type) {
		$scope.alerts.push({
			type : a_type,
			msg : a_msg
		});

	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	var errorFunction = function (data) {

		addAlert(data.message, 'danger');
	};

	$scope.register = function () {

		if (!($scope.user.email && $scope.user.password && $scope.password2)) {
			addAlert('Please enter all information', 'warning');
		} else if ($scope.user.password != $scope.password2) {
			addAlert('Passwords do not match!', 'warning');
		} else {

			Auth.register($scope.user).then(function (authData) {

				return Auth.login($scope.user).then(function () {
					authData.username = $scope.user.username;
					return Auth.createProfile(authData);
					
				}).then(function(){
					$location.path('/');
				});
				
			}, errorFunction);
		}
	};
});
app.controller('passwordResetCtrl', function ($scope, $modalInstance, firebaseService, email, oldpw, Auth) {
	$scope.alerts = [];

	var addAlert = function (a_msg, a_type) {
		$scope.alerts.push({
			type : a_type,
			msg : a_msg
		});
		

	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.resetPassword = function () {
		if ($scope.password != $scope.password2) {
			addAlert("Passwords do not match!", "danger");
		} else {
			Auth.changePassword({
				email : email,
				oldPassword : oldpw,
				newPassword : $scope.password
			}).then(function () {
				$modalInstance.close(true);
			}, function (error) {
				if (error === null) {
					$modalInstance.close(true);
				} else {
					addAlert("Error changing password:" + error.message, "danger");
				}
			});
		}

	}

});
app.controller('loginModalCtrl', function ($scope, $modal, $modalInstance, $firebase, $firebaseAuth, $cookies, $location, firebaseService, Auth) {


	$scope.alerts = [];

	var addAlert = function (a_msg, a_type) {
		$scope.alerts.push({
			type : a_type,
			msg : a_msg
		});
		

	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	$scope.sendPasswordReset = function () {
		if (!$scope.email) {
			addAlert("Please enter an email", "danger");
		} else {
			Auth.resetPassword($scope.email).then(function (success) {
				addAlert("Password reset email sent successfully", "success");
			}, function (error) {

				addAlert("Error sending password reset email: " + error.message, "danger");

			});

		}
	};

	$scope.login = function () {
		if (!($scope.user.email && $scope.user.password)) {
			addAlert('Please enter all information', 'warning');
		} else {

			return Auth.login($scope.user).then(function () {
				$location.path('/');
				if (Auth.user.password.isTemporaryPassword) {
					var modalInstance = $modal.open({
							templateUrl : 'partials/passwordResetModal.html',
							controller : 'passwordResetCtrl',
							resolve : {
								email : function () {
									return $scope.user.email;
								},
								oldpw : function () {
									return $scope.user.password;
								}
							}

						});

				} 
				$modalInstance.close();
					
				
			},
			
			function(error){
				addAlert(error.message,"danger");
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
