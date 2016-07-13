var app = angular.module('chommiesApp', ['ngRoute']); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'FeedCtrl',
		templateUrl: 'templates/feed.html'
	});
	$routeProvider.when('/me/:brusId', {
		controller: 'meCtrl',
		templateUrl: 'templates/me.html'
	});
});

//Main page's controller
app.controller('FeedCtrl', function($scope, $http) {

//GET the props from the API
	$http({
		url: 'http://ixchommies.herokuapp.com/props',
		method: 'GET',
		params: {
			token: '78dddf94a00dd089f4c1471b2fdf0c86',
		}
	}).then(function(response) {
		console.log(response);
		$scope.props = response.data;
	});

//GET the Brus from API
	$http({
		url: 'http://ixchommies.herokuapp.com/brus',
		method: 'GET',
		params: {
			token: '78dddf94a00dd089f4c1471b2fdf0c86',
		}
	}).then(function(response) {
		console.log(response);
		$scope.brus = response.data;
	})

//Send props to API
	$scope.sendProps = function(x, y) {
		$http({
		url: 'http://ixchommies.herokuapp.com/props',
		method: 'POST',
		params: {
			token: '78dddf94a00dd089f4c1471b2fdf0c86',
		},
		data: {
			for: x,
			props: y,
		}
	}).then(function(response) {
//add props to your array of props
		$scope.props.unshift(response.data);
		$scope.newPropsValue = "";
	}).catch(function(response2) {
		// alert("Your comment was not positive enough");
		$scope.error = "that is an invalid input"
	});
  	}
});


app.controller('meCtrl', function($scope, $http) {
	$http({
		url: 'http://ixchommies.herokuapp.com/props/me',
		method: 'GET',
		params: {
			token: '78dddf94a00dd089f4c1471b2fdf0c86',
		}
	}).then(function(response) {
		console.log(response);
		$scope.myProp = response.data;
	})
});