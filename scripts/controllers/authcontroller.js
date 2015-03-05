app.controller('AuthCtrl', function($scope, $location, Auth, user){
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

	  $scope.register = function () {
	  
	  if (!($scope.user.email && $scope.user.password && $scope.password2)) {
			addAlert('Please enter all information', 'warning');
		} else if($scope.user.password != $scope.password2){
			addAlert('Passwords do not match!', 'warning');
		}else{
		
			Auth.register($scope.user, function() {
			  return Auth.login($scope.user, function() {
				$location.path('/');
			  });
			});
		}
	  };
});
app.controller('passwordResetCtrl', function ($scope, $modalInstance, firebaseService, email, oldpw) {
	$scope.alerts = [];

	var addAlert = function (a_msg, a_type) {
		$scope.alerts.push({
			type : a_type,
			msg : a_msg
		});
		$scope.$apply();

	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.resetPassword = function () {
		if ($scope.password != $scope.password2) {
			addAlert("Passwords do not match!", "danger");
		} else {
			firebaseService.ref.changePassword({
				email : email,
				oldPassword : oldpw,
				newPassword : $scope.password
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
app.controller('signupModalCtrl', function ($scope, $modal,$modalInstance, $firebase, $firebaseAuth, $cookies, firebaseService, modaltype) {

	$scope.signup = modaltype == 'signup';
	$scope.alerts = [];

	var addAlert = function (a_msg, a_type) {
		$scope.alerts.push({
			type : a_type,
			msg : a_msg
		});
		$scope.$apply();

	};

	$scope.closeAlert = function (index) {
		$scope.alerts.splice(index, 1);
	};
	$scope.sendPasswordReset = function () {
		if (!$scope.email) {
			addAlert("Please enter an email", "danger");
		} else {
			firebaseService.ref.resetPassword({
				email : $scope.email
			}, function (error) {
				if (error === null) {
					//console.log("Password reset email sent successfully");
					addAlert("Password reset email sent successfully", "success");

				} else {
					addAlert("Error sending password reset email: " + error.message, "danger");
				}
			});

		}
	};

	$scope.login = function () {
		if ($scope.email && $scope.password) {
			firebaseService.ref.authWithPassword({
				email : $scope.email,
				password : $scope.password
			}, function (error, authData) {
				if (error) {
					console.log("Login Failed!", error);
					addAlert(error.message, 'danger');
				} else {
					console.log("Authenticated successfully with payload:", authData);
					$cookies.token = authData.token;
					if (authData.password.isTemporaryPassword) {
						var modalInstance = $modal.open({
								templateUrl : 'partials/passwordResetModal.html',
								controller : 'passwordResetCtrl',
								resolve : {
									email : function () {
										return $scope.email;
									},
									oldpw : function () {
										return $scope.password
									}
								}

							});

						modalInstance.result.then(function (success) {}, function () {
							$log.info('Modal dismissed at: ' + new Date());
						});
					}
					$modalInstance.close(authData);
				}
			});
		} else {
			addAlert('Please enter all information', 'warning');
		}

	};
	$scope.createUser = function () {

		console.log($scope.email);
		console.log($scope.password);
		
		if (!($scope.email && $scope.password && $scope.password2)) {
			addAlert('Please enter all information', 'warning');
		} else if($scope.password != $scope.password2){
			addAlert('Passwords do not match!', 'warning');
		}else{
			firebaseService.ref.createUser({
				email : $scope.email,
				password : $scope.password
			}, function (error, userData) {
				if (error) {
					console.log("Error creating user:", error);
					addAlert(error.message, 'danger');
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