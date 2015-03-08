app.factory('Profile',function( $window, $firebase, FIREBASE_URL, Machine, $q){
	var ref = new $window.Firebase(FIREBASE_URL);

  var profile = {
		get:function(userId){
			return $firebase(ref.child('profile').child(userId)).$asObject();
		},
		getMachines: function(userId){
			var defer = $q.defer();
			$firebase(ref.child('user_machines').child(userId))
				.$asArray()
				.$loaded()
				.then(function(data){
					var machines = {};
					for(var i = 0; i < data.length; i++){
						var value = data[i].$value;
						machines[value] = Machine.get(value);
					}
					defer.resolve(machines);
				
				});
			return defer.promise;
		
		}



	};
	return profile;
});