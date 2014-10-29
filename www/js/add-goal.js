(function(){
  
  var addGoal = angular.module('OneUp-AddGoal', ['ionic'])

  addGoal.controller('AddGoalCtrl', function($scope, $ionicModal){
    $ionicModal.fromTemplateUrl('add-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openAddModal = function() {
      $scope.newGoal = {};
      $scope.newGoal.startDate = new Date();
      $scope.newGoal.targetDate = new Date($scope.newGoal.startDate.getFullYear(), $scope.newGoal.startDate.getMonth(), $scope.newGoal.startDate.getDate() + 7);
      $scope.newGoal.icon = "ion-arrow-right-c";
      $scope.newGoal.theme = "positive";

      $scope.modal.show()
    }

    $scope.closeAddModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.getDate = function() {
      $ionicPlatform.ready(function() {
        $cordovaDatePicker.show({date: new Date(), mode: 'date'}).then(function(date){
          $scope.newGoal.targetDate = date;
        }, false);
      });
    };

    $scope.addGoal = function() {
      $scope.goals.push($scope.newGoal);

      $scope.updateGoals();
    }
  });

  addGoal.controller('PickColorCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('color-popover.html', {scope: $scope}).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.setTheme = function(t) {
      $scope.newGoal.theme = t;
      $scope.popover.hide();
    };
  });

  addGoal.controller('PickIconCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('icon-popover.html', {scope: $scope}).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.setIcon = function(i) {
      $scope.newGoal.icon = i;
      $scope.popover.hide();
    };
  });

})();