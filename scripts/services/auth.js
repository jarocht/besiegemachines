app.factory('Auth',function( $firebaseAuth,FIREBASE_URL, $rootScope, $location){
	var ref = new Firebase(FIREBASE_URL);
	var fireAuth = $firebaseAuth(ref);

  var Auth = {
    register: function (user) {
      return fireAuth.$createUser({email:user.email, password:user.password});
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
    user: {},
	error: ''
  };
	
   fireAuth.$onAuth(function(authData) {
     angular.copy(authData,Auth.user);
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