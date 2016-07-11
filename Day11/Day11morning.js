var app = angular.module('moviesApp', ['ngRoute']); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/home.html'
	})
	$routeProvider.when('/moviepage/:movieId', {
		templateUrl: 'templates/moviepage.html'
	})
});

app.controller('MainCtrl', function($scope, $http) {
	$scope.search=function() {
		$http({
			url: "http://www.omdbapi.com/?",
			method: 'GET',
			params: {
				s: $scope.userInput
			}
		}).then(function(response) {
			console.log(response);
			$scope.moviesArray = response.data.Search;
		});
	}
});

app.controller('MovieCtrl', function($scope, $http, $routeParams) {
	$http({
		url: "http://www.omdbapi.com/",
		method: "GET",
		params: {
			i: $routeParams.movieId
		}
	}).then(function(response) {
		console.log(response);
		$scope.movieId = response.data.imdbID;
		$scope.Title = response.data.Title;
		$scope.Plot = response.data.Plot;
		$scope.Director = response.data.Director;
		$scope.Actors = response.data.Actors;

		$http({
			url: "http://api.giphy.com/v1/gifs/search",
			method: "GET",
			params: {
				q: $scope.Title,
				api_key: "dc6zaTOxFJmzC",
			}
		}).then(function(response) {
			console.log(response);
			$scope.gifs = response.data.data;
		})

	})

});
