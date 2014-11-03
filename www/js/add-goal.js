(function(){
  
  var addGoal = angular.module('OneUp-AddGoal', ['ionic'])

  addGoal.controller('AddGoalCtrl', function($scope, $ionicModal, $window){
    $ionicModal.fromTemplateUrl('add-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openAddModal = function() {
      $scope.newGoal = {};
      $scope.newGoal.goalId = $scope.goals.length;
      $scope.newGoal.startDate = moment("00:00", "hh:mm").toDate();
      $scope.newGoal.targetDate = moment("00:00", "hh:mm").add(7, 'days').toDate();
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
      datePicker.show({date: $scope.newGoal.targetDate, mode: 'date'}, function(date){
        $scope.newGoal.targetDate = date; 
      });
    };

    $scope.addGoal = function() {
      $scope.goals.push($scope.newGoal);
      $window.localStorage['goals'] = JSON.stringify($scope.goals);

      $scope.closeAddModal();
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