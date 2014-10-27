(function(){
  
  var goal = angular.module('OneUp-Goal', ['ionic'])

  goal.controller('GoalCtrl', function($scope, $ionicModal){
    $scope.currentDate = new Date();
    $scope.currentDate.setDate(1);

    $ionicModal.fromTemplateUrl('goal-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openGoalModal = function(g) {
      $scope.currentGoal = g;
      $scope.currentDate = new Date();
      $scope.currentDate.setDate(1);

      $scope.modal.show()
    }

    $scope.closeGoalModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.generateCalendar = function(week) {
      var weekArray = [];
      var day = 1 - $scope.currentDate.getDay() + week * 7;

      for (i = 0; i < 7; i++) {
        weekArray.push(day);
        day++;
      }

      return weekArray;
    };

    $scope.prevMonth = function() {
      $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);
    };

    $scope.nextMonth = function() {
      $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
    };
  });

  goal.filter('dateString', function() {
    return function(input) {
      var month = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      return month[input.getMonth()] + " " + input.getFullYear();
    };
  });

  goal.filter('calendarDay', function() {
    return function(input, date) {
      if (input < 1) {
        var d = new Date(date.getFullYear(), date.getMonth(), 0);

        return d.getDate() + input;
      } else if (input > getDaysInMonth(date)) {
        var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return input % d.getDate();
      } else {
        return input.toString();
      }
    };
  });

  goal.filter('calendarDayStyle', function() {
    return function(input, date) {
      if (input < 1 || input > getDaysInMonth(date)) {
        return "notCurrentMonth";
      } else {
        return "currentMonth";
      }
    };
  });

  function getDaysInMonth(date) {
    var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
  }

})();