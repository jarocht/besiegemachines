'use strict';

app.controller('MachineViewCtrl', function ($scope, $stateParams, Machine, Auth) {
	$scope.machine = Machine.get($stateParams.machineId);
	$scope.comments = Machine.comments($stateParams.machineId);

	$scope.user = Auth.user;
	$scope.signedIn = Auth.signedIn;
	$scope.addComment = function () {
		if (!$scope.commentText || $scope.commentText === '') {
			return;
		}

		var comment = {
			txt : $scope.commentText,
			usr : $scope.user.profile.usr,
			uid : $scope.user.uid
		};
		$scope.comments.$add(comment);

		$scope.commentText = '';
	};
});