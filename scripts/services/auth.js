app.factory('Auth',function( FIREBASE_URL, $rootScope, $location){
	var ref = new Firebase(FIREBASE_URL);


  var Auth = {
    register: function (user,successfunction) {
      return ref.createUser({email:user.email, password:user.password},successfunction);
    },
    login: function (user,successfunction) {
		if(typeof(user) == 'string'){
			return ref.authWithCustomToken(user,successfunction);
		}else{
			return ref.authWithPassword({email:user.email, password:user.password},function(){});
		}
    },
    logout: function () {
      ref.unauth();
    },
    resolveUser: function() {
      return ref.getAuth();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {},
	error: ''
  };

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