'use strict';

app.controller('MachineViewCtrl', function ($scope, $stateParams, Machine) {
	$scope.machine = Machine.get($stateParams.machineId);
});