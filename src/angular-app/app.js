var app = angular.module('myApp', []);

app.controller('MainController', function($scope) {
    $scope.angularCount = 10;

    $scope.updateFromReact = function(newCount) {
        $scope.$apply(function() {
            $scope.angularCount = newCount;
        });
        

    };

    document.addEventListener('reactToAngularEvent', function(event) {
        console.log('Received event from React:', event.detail.count);
        $scope.updateFromReact(event.detail.count);
    });
});
