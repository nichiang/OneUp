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

      // $scope.currentGoal = {
      //   goalId: $scope.goals.length,
      //   startDate: moment().startOf('day').toDate(),
      //   targetDate: moment().startOf('day').add(7, 'days').toDate(),
      //   icon: "ion-arrow-right-c",
      //   theme: "positive",
      //   chains: [],
      //   currentChain: null
      // };

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
      scope: {
        mode: '@',
        goal: '=?',
        allGoals: '=',
        onSave: '&'
      },
      controller: function($scope, $window) {
        $scope.getDate = function() {
          datePicker.show({date: $scope.goal.targetDate, mode: 'date'}, function(date){
            $scope.goal.targetDate = date; 
          });
        };

        $scope.addSaveGoal = function() {
          if ($scope.mode === "add") {
            $scope.allGoals.push($scope.goal);
          }
          
          $window.localStorage['goals'] = JSON.stringify($scope.allGoals);

          $scope.onSave();
        }
      },
      templateUrl: 'add-edit-template.html',
      link: function(scope, elem, attrs) {
        if (scope.mode === 'add') {
          scope.goal = {
            goalId: scope.allGoals.length,
            startDate: moment().startOf('day').toDate(),
            targetDate: moment().startOf('day').add(7, 'days').toDate(),
            icon: "ion-arrow-right-c",
            theme: "positive",
            chains: [],
            currentChain: null
          };

          scope.saveButton = "Add Goal";
        } else {
          scope.saveButton = "Save";
        }
      }
    };
  });

  goalPopovers.controller('PickColorCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('color-popover.html', {scope: $scope}).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    $scope.setTheme = function(t) {
      $scope.goal.theme = t;
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
      $scope.goal.icon = i;
      $scope.popover.hide();
    };
  });

})();