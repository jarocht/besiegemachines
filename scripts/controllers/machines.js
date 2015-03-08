'use strict';

app.controller('MachinesCtrl', function ($scope, $location, Machine, Auth) {
	$scope.machines = Machine.all;
	$scope.user = Auth.user;
	
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