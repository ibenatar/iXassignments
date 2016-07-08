var app = angular.module('nytimesApp', []);
var NY_TIMES_API_KEY = 'fb123a64299c4b128a1804c869370e6c';
app.controller('searchCtrl', function($scope, $http) {
	$scope.search=function() {

		$http({
			url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
			method: 'GET',
			params: {
				'api-key': NY_TIMES_API_KEY,
				'q': $scope.userInput
			}
		}).then(function(response) {
			console.log(response);
			$scope.articles = response.data.response.docs;
		});
	}
});