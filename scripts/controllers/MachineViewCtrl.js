'use strict';

app.controller('MachineViewCtrl', function ($scope, $routeParams, Machine) {
	$scope.machine = Machine.get($routeParams.machineId);
});