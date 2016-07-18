var app = angular.module('tensionApp', ['ngRoute', 'firebase']);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path('/login');
    }
  });
}]);

app.config(function($routeProvider) { 
	$routeProvider.when('/signUp', { 
		controller: 'SignUpCtrl',
		templateUrl: '/templates/signUp.html'
	})
	$routeProvider.when('/login', {
		controller: 'LoginCtrl',
		templateUrl: '/templates/login.html',
		resolve: {
        	"currentAuth": function($firebaseAuth) {
        	return $firebaseAuth().$waitForSignIn();
      		}
    	}
	})
	$routeProvider.when('/', { 
		controller: 'HomeCtrl',
		templateUrl: '/templates/home.html',
		resolve: {
        	"currentAuth": function($firebaseAuth) {
        	return $firebaseAuth().$requireSignIn();
      		}
    	}

	})
	$routeProvider.when('/channel/:channelId', { 
		controller: 'ChannelCtrl',
		templateUrl: '/templates/general.html',
		resolve: {
    		"currentAuth": function($firebaseAuth) {
    		return $firebaseAuth().$requireSignIn();
  			}
		}
	});

});

app.controller('SignUpCtrl', function($scope, $routeParams, $firebaseObject, $firebaseAuth, $location) { 
	
	$scope.authObj = $firebaseAuth();

	$scope.signUp = function() { 

		$scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
		.then(function(firebaseUser) {
			console.log("User " + firebaseUser.uid + " created successfully!")
			var userRef = firebase.database().ref().child('users').child(firebaseUser.uid);
			$scope.user = $firebaseObject(userRef);
			$scope.user.name = $scope.name;
			$scope.user.$save();

			$location.path('/');

		}).catch(function(error) {
    		$scope.errorMessage = error.message;
  		});

	}
});

app.controller('LoginCtrl', function($scope, $routeParams, $firebaseObject, $firebaseAuth) {
	$scope.login = function() {
		console.log($scope.email);
		console.log($scope.password);

		$scope.authObj = $firebaseAuth();

		$scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password)
		.then(function(firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
			window.location.assign('/');

		}).catch(function(error) {
  			console.error("Authentication failed:", error);
		})

	}
});

app.controller('HomeCtrl', function ($scope, $firebaseObject, $firebaseAuth, $location) { 

	var ref = firebase.database().ref().child('channels');
	$scope.channels = $firebaseObject(ref);

	$scope.authObj = $firebaseAuth();

	$scope.signOut = function() {
		$scope.authObj.$signOut();
		console.log("user signed out");
		$location.href = "#/login";
	}

	$scope.addChannel = function() {

		var ref = firebase.database().ref().child('channels').child($scope.channelName);
		$scope.channel = $firebaseObject(ref);

		console.log($scope.channelName);
		console.log($scope.channelDescription);
		$scope.channel.name = $scope.channelName;
		console.log($scope.channels.name, " <--channel name");
		$scope.channel.description = $scope.channelDescription;
		$scope.channel.$save();
	}

	var userRef = firebase.database().ref().child('users');
	$scope.users = $firebaseObject(userRef);

});

// app.controller('HomeCtrl', function(currentAuth, $scope, $firebaseObject) { 
// 	$scope.curUser = currentAuth;
// 	$scope.authObj = $firebaseAuth;




app.controller('ChannelCtrl', function($scope, $routeParams, $firebaseArray, currentAuth, $firebaseObject){
	var ref = firebase.database().ref().child('messages').child($routeParams.channelId);
	$scope.messages = $firebaseArray(ref);
	
	var userRef = firebase.database().ref().child('users').child(currentAuth.uid);
	var user = $firebaseObject(userRef);

	$scope.sendMessage = function () { 
		$scope.messages.$add({
			sender: currentAuth.uid, 
			text: $scope.newMessage, 
			created_at: Date.now(),
			name: user.name
		});
		console.log(user.name);

		$scope.newMessage = "";
		$scope.userName = "";
	};

	console.log(currentAuth);

});

	

// var app = angular.module('tensionApp', ['ngRoute', 'firebase']); 

// app.config(function($routeProvider) {
// 	$routeProvider.when('/', {
// 		controller: 'ChannelCtrl',
// 		templateUrl: 'templates/general.html'
// 	})
// })


// app.controller("ChannelCtrl", function($scope, $firebaseArray) {

// 	var ref = firebase.database().ref().child("messages");
// 	$scope.messages = $firebaseArray(ref);

// 	$scope.sendMessage = function() {
// 		$scope.messages.$add({
// 			sender: $scope.userName,
// 			text: $scope.newMessage,
// 			created_at: Date.now()
// 		});

// 		$scope.newMessage = "";
// 	};
// });

// //added during class (is listctrl essentially the homepage?)
// app.controller("ListCtrl", function($scope, $firebaseObject) {

// 	var ref = firebase.database().ref()
// 		.child("channels").child("general");
// 	$scope.channels = $firebaseObject(ref);
// 	$scope.channels.name = "General";
// 	$scope.channels.description = "discussion";
// 	$scope.channels.save(); 

// //let user add a channel
// 	$scope.addChannel = function() {
// 		$scope.channels[$scope.newCHannelId] = {
// 			'name': $scope.newChannelName,
// 		};
// 		$scope.channels.$save();
// 	}
// //^needs stuff in html
// });

