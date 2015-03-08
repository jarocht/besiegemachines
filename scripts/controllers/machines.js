'use strict';

app.controller('MachinesCtrl', function ($scope, $location, Machine, Auth) {
	$scope.machines = Machine.all;
	$scope.user = Auth.user;
	$scope.divwidth = 341;
	
	$scope.$watch('divwidth',function(val){  $scope.query = {maxwidth:$scope.divwidth,styles:true};	$('embedly-embed').attr('width',$scope.divwidth); });
	
	
	

		$scope.$watch('query',function(val){  console.log(val) });
	$scope.key = "ff4f4543bdab49338dbb6dd6ea361049";
	$scope.query = {maxwidth:$scope.divwidth,styles:true};
	$scope.machine = {T:'Test Tile',DE:'Description'};
	
	
	$scope.submitMachine = function(){
		$scope.machine.uid = Auth.user.uid;
		$scope.machine.usr = Auth.user.profile.usr;
		Machine.create($scope.machine).then( function(ref){
		

			$location.path('/machines/' + ref.name());
		});
		
		
	};
	$scope.deleteMachine = function(machine){
		  Machine.delete(machine);
		
	};
});