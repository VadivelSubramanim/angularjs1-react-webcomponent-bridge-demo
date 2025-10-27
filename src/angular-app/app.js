var app = angular.module('myApp', []);

app.controller('MainController', function($scope) {
    $scope.angularCount = 10;

    $scope.updateFromReact = function(newCount) {
        $scope.$apply(function() {
            $scope.angularCount = newCount;
        });
    };

    $scope.updateAngularFromReact = function(data) {
        console.log('Direct update from React:', data);
        $scope.angularCount = data.reactCount;
        $scope.lastMessage = data.message;
    };

    document.addEventListener('reactToAngularEvent', function(event) {
        console.log('Received event from React:', event.detail.count);
        $scope.updateFromReact(event.detail.count);
    });
});
