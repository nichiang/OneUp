(function(){
  
  var addEditGoal = angular.module('OneUp-AddEditGoal', ['ionic']);
  var goalPopovers = angular.module('OneUp-Popovers', ['ionic']);

  addEditGoal.controller('AddEditGoalCtrl', function($scope, $ionicModal){
    $ionicModal.fromTemplateUrl('add-edit-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openAddEditModal = function() {
      $scope.formMode = "Add";

      $scope.currentGoal = {
        goalId: $scope.goals.length,
        startDate: moment().startOf('day').toDate(),
        targetDate: moment().startOf('day').add(7, 'days').toDate(),
        icon: "ion-arrow-right-c",
        theme: "positive",
        chains: [],
        currentChain: null
      };

      $scope.modal.show()
    }

    $scope.closeAddEditModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });

  addEditGoal.directive('oneupAddEditForm', function() {
    return {
      restrict: 'E',
      scope: false,
      controller: function($scope, $window) {
        $scope.getDate = function() {
          datePicker.show({date: $scope.currentGoal.targetDate, mode: 'date'}, function(date){
            $scope.currentGoal.targetDate = date; 
          });
        };

        $scope.addSaveGoal = function() {
          if ($scope.formMode === "add") {
            $scope.goals.push($scope.currentGoal);
          }
          
          $window.localStorage['goals'] = JSON.stringify($scope.goals);

          $scope.closeAddEditModal();
        }
      },
      templateUrl: 'add-edit-template.html'
    }
  });

  goalPopovers.controller('PickColorCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('color-popover.html', {scope: $scope}).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.setTheme = function(t) {
      $scope.currentGoal.theme = t;
      $scope.popover.hide();
    };
  });

  goalPopovers.controller('PickIconCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('icon-popover.html', {scope: $scope}).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.setIcon = function(i) {
      $scope.currentGoal.icon = i;
      $scope.popover.hide();
    };
  });

})();