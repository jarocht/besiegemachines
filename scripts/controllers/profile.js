
app.controller('ProfileCtrl', function ($scope, $stateParams, Profile) {
	var uid = $stateParams.userId;
	
	$scope.profile = Profile.get(uid);
	Profile.getMachines(uid).then(function(machines){
		$scope.machines = machines;
	});
	

});