(function(){
  
  var goal = angular.module('OneUp-Goal', ['ionic', 'angular-inview']);

  goal.controller('GoalCtrl', function($scope, $ionicModal, $ionicScrollDelegate, $timeout, $location){
    $scope.displayWeeks = [];

    $scope.showFlipped = false;
    $scope.backStyle = {};

    $ionicModal.fromTemplateUrl('goal-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    });

    $scope.openGoalModal = function(g) {
      $scope.currentGoal = g;
      $scope.showFlipped = false;
      
      $scope.currentMonth = moment().startOf('month');
      $scope.displayWeeks = [];
      $scope.initCalendar();

      $scope.modal.show()
    };

    $scope.closeGoalModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.toggleEdit = function() {
      if ($scope.showFlipped) {

        // change orientation of backGoal back to front facing 10 ms after animation completes
        $timeout(function() {
          $scope.backStyle = {'-webkit-transform': 'rotateY(0deg)', 'transform': 'rotateY(0deg)'};
        }, 610);

        $scope.showFlipped = false;
      } else {

        // change orientation of backGoal to back facing in preparation for flip animation
        $scope.backStyle = {'-webkit-transform': 'rotateY(180deg)', 'transform': 'rotateY(180deg)'};
        $scope.showFlipped = true;
      }
    };

    $scope.initCalendar = function() {
      var displayWeeksStart = moment($scope.currentGoal.startDate).startOf('month');
      var displayWeeksEnd = moment().endOf('month');
      var displayWeeksDiff = displayWeeksEnd.diff(displayWeeksStart, 'weeks');

      $scope.displayWeeks.push({'week': displayWeeksStart.week(), 'year': displayWeeksStart.year()});

      for (i = 0; i <= displayWeeksDiff; i++) {
        $scope.displayWeeks.push({'week': displayWeeksStart.add(1, 'weeks').week(), 'year': displayWeeksStart.year()});
      }

      $ionicScrollDelegate.$getByHandle('calendar').scrollBottom(false);
    }

    $scope.getDaysOfWeek = function(w) {
      var daysOfWeek = [];

      for (i = 0; i < 7; i++) {
        daysOfWeek.push(moment().year(w.year).week(w.week).day(i).date());
      }

      return daysOfWeek;
    };

    $scope.currentVisibleMonth = function(w, visible) {
      if (visible) {
        $scope.currentMonth = moment().year(w.year).week(w.week).startOf('month');
      }
    };

    $scope.currentMonthClass = function(w, i) {
      var m = moment().year(w.year).week(w.week).day(i).startOf('month');

      if ($scope.currentMonth.isSame(m)) {
        return "activeMonth";
      }
    };

    $scope.monthTag = function(w) {
      return moment().year(w.year).week(w.week).endOf('week').format("MMMYYYY");
    };

    $scope.isMiddleOfMonth = function(d) {
      return d == 20; // day that determines when active month is highlighted
    };

    $scope.isCalendarOverflow = function(d, scope) {
      return (scope.$first && d > 8) || (scope.$last && d < 8);
    }
  });

})();