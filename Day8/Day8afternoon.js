var app=angular.module('groceryList', []);

app.controller('ListCtrl', function($scope) {
	$scope.items = [];
	$scope.repeat = false;
	$scope.addItem = function () {
		var newItem = {
			name: $scope.itemName,
			quantity: $scope.quantity
		};
	for(i=0; i<$scope.items.length; i++) {
		if($scope.items[i].name===newItem.name) {
			$scope.repeat=true;
			$scope.items[i].quantity=parseInt($scope.items[i].quantity)+parseInt(newItem.quantity);
		}
	}
	if ($scope.repeat===false) $scope.items.push(newItem);

		$scope.quantity = "";
		$scope.itemName = "";
	};
	$scope.add = function(item) {
		item.quantity = parseInt(item.quantity);
		item.quantity += 1;
	};
	$scope.subtract = function(item) {
		if(item.quantity != 0) {
			item.quantity -= 1;
		}
	};
});
