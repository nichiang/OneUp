(function(){
  
  var addGoal = angular.module('OneUp-AddGoal', ['ionic'])

  addGoal.controller('AddGoalCtrl', function($scope, $ionicModal){
    $scope.today = new Date();
    $scope.targetDate = new Date();

    $ionicModal.fromTemplateUrl('add-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openAddModal = function() {
      $scope.modal.show()
    }

    $scope.closeAddModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.getDate = function() {
      datePicker.show({date: new Date(), mode: 'date'}, function(date){
        $scope.targetDate = date;
      });
    };
  });

  addGoal.controller('PickColorCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('color-popover.html', {scope: $scope}).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.setTheme = function(t) {
      $scope.theme = t;
      $scope.popover.hide();
    };
  });

})();