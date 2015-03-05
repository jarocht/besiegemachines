'use strict';

app.factory('Machine', function ($firebase, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL);
	var machines = $firebase(ref.child('machines')).$asArray();
	
	var Machine = {
		all:machines,
		create: function(machine){
			return machines.$add(machine);
		},
		get: function(machineId){
			return $firebase(ref.child('machines').child(machineId)).$asObject();
		},
		delete: function(machine){
			return machines.$remove(machine);
		}
	
	};
	return Machine;
});