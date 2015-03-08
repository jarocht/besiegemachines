app.factory('Auth',function( $firebase, $firebaseAuth, FIREBASE_URL, $rootScope, $location){
	var ref = new Firebase(FIREBASE_URL);
	var fireAuth = $firebaseAuth(ref);

  var Auth = {
    register: function (user) {
      return fireAuth.$createUser({email:user.email, password:user.password});
    },
	createProfile: function(user){
		var profile = {
			usr:user.username
		};
		var profileRef = $firebase(ref.child('profile'));
		return profileRef.$set(user.uid,profile);
	
	},
    login: function (user) {
		if(typeof(user) == 'string'){
			return fireAuth.$authWithCustomToken(user);
		}else{
			return fireAuth.$authWithPassword({email:user.email, password:user.password});
		}
    },
    logout: function () {
      fireAuth.$unauth();
	  if(this.user && this.user.profile) {
		this.user.profile.$destroy();
	}
	angular.copy({}, this.user);
    },
    resolveUser: function() {
      return fireAuth.$getAuth();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
	resetPassword:function(email){
		return fireAuth.$resetPassword({'email':email});
	},
	changePassword:function(passwordOptions){
		return fireAuth.$changePassword(passwordOptions);
	},
    user: {},
	error: ''
  };
	
   fireAuth.$onAuth(function(authData) {
     angular.copy(authData,Auth.user);
	 Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
	  Auth.user.profile.$loaded().then(function(){
	  
		console.log(Auth.user.profile);
	  });
	 console.log(Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    angular.copy({}, Auth.user);
  });

  return Auth;


});