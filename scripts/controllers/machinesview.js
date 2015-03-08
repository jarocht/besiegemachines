'use strict';

app.controller('MachineViewCtrl', function ($scope, $stateParams, Machine, Auth) {
	
$scope.divwidth = 341;
	
	$scope.$watch('divwidth',function(val){  $scope.query = {maxwidth:$scope.divwidth,styles:true};	$('embedly-embed').attr('width',$scope.divwidth); });
	
	
	

		$scope.$watch('query',function(val){  console.log(val) });
	$scope.key = "ff4f4543bdab49338dbb6dd6ea361049";
	$scope.query = {maxwidth:$scope.divwidth,styles:true};
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
	$scope.deleteComment = function (comment) {
  $scope.comments.$remove(comment);
};
});