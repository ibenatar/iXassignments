var app=angular.module('calculatorApp', []);

app.controller('CalculatorCtrl', function($scope) {
	$scope.doAdd = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		$scope.result = numX + numY;
	}
	$scope.doMultiply = function () {
		var numA = parseInt($scope.x);
		var numB = parseInt($scope.y);
		$scope.result = numA*numB;
	};
	$scope.doDivide = function () {
		var numC = parseInt($scope.x);
		var numD = parseInt($scope.y);
		$scope.result = numC/numD;
	};
});