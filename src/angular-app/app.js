var app = angular.module('myApp', []);

app.controller('MainController', function($scope) {
    $scope.angularCount = 10;
    $scope.stakeholder = 'default';
    $scope.formData = {};

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

    document.addEventListener('form-data-loaded', function(event) {
        console.log('Received form data:', event.detail);
        $scope.$apply(function() {
            $scope.formData = event.detail;
        });
    });
});
