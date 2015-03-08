
app.controller('UploadCtrl', function ($scope,  $location,Machine, Auth, user) {
	if (!user) {
		$location.path('/');
	}
	$scope.signedIn = Auth.signedIn;

	$scope.user = Auth.user;

	$scope.upload = function(){
		$scope.machine.uid = $scope.user.uid;
		$scope.machine.usr = $scope.user.profile.usr;
		$scope.machine.CD = new Date();
		Machine.create($scope.machine);
		
		
	};
});
