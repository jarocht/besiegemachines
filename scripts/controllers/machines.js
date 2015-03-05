'use strict';

app.controller('MachinesCtrl', function ($scope, $location, Machine) {
	$scope.machines = Machine.all;
	
	$scope.machine = {T:'Test Tile',DE:'Description'};
	
	
	$scope.submitMachine = function(){
		Machine.create($scope.machine).then( function(ref){
		

			$location.path('/machines/' + ref.name());
		});
		
		
	};
	$scope.deleteMachine = function(machine){
		  Machine.delete(machine);
		
	};
});