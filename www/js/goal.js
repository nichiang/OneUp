(function(){
  
  var goal = angular.module('OneUp-Goal', ['ionic']);

  goal.controller('GoalCtrl', function($scope, $ionicModal, $ionicScrollDelegate, $timeout, $document){
    $scope.displayWeeks = [];
    $scope.chains = [];
    $scope.longestChain = 0;
    $scope.currentChainLength = 0;
    $scope.tillTargetDate = 0;

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
      $scope.formMode = "Edit";
      $scope.showFlipped = false;
      
      $scope.currentMonth = moment().startOf('month');
      $scope.tillTargetDate = moment($scope.currentGoal.targetDate).diff(moment(), 'days');
      $scope.displayWeeks = [];

      $scope.initChains();
      $scope.initCalendar();

      $scope.modal.show();

      // delay load the calendar view until after the entrance transition has completed
      $timeout(function() {
        $scope.showCalendar = true;
        $ionicScrollDelegate.$getByHandle('calendar').scrollBottom(true);
      }, 500);
    };

    $scope.closeGoalModal = function() {
      $scope.modal.hide();
      $scope.showCalendar = false;

      $timeout(function() {
        $scope.showFlipped = false;
      }, 300);
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
        
        // delay flip until css styles set
        $timeout(function() {
          $scope.showFlipped = true;
        }, 50);
      }
    };

    $scope.initCalendar = function() {
      var displayWeeksStart = moment($scope.currentGoal.startDate).startOf('month').subtract(1, 'weeks');
      var displayWeeksEnd = moment($scope.currentGoal.targetDate).endOf('month');
      var displayWeeksDiff = displayWeeksEnd.diff(displayWeeksStart, 'weeks');

      $scope.displayWeeks.push({'week': displayWeeksStart.week(), 'year': displayWeeksStart.year()});

      for (i = 0; i <= displayWeeksDiff; i++) {
        $scope.displayWeeks.push({'week': displayWeeksStart.add(1, 'weeks').week(), 'year': displayWeeksStart.year()});
      }

      // $ionicScrollDelegate.$getByHandle('calendar').scrollBottom(false);
    };

    $scope.getDaysOfWeek = function(w) {
      var daysOfWeek = [];

      for (i = 0; i < 7; i++) {
        daysOfWeek.push(moment().year(w.year).week(w.week).day(i).date());
      }

      return daysOfWeek;
    };

    $scope.dayClass = function(w, i) {
      var classList = [];
      var currentDay = moment().year(w.year).week(w.week).day(i);
      var m = moment().year(w.year).week(w.week).day(i).startOf('month');

      if ($scope.currentMonth.isSame(currentDay, 'month')) {
        classList.push("activeMonth");
      }

      if ($scope.chains["d" + currentDay.format("YYYYMMDD")] != null) {
        classList.push($scope.chains["d" + currentDay.format("YYYYMMDD")]);
        classList.push($scope.currentGoal.theme + "-before-bg");
        classList.push($scope.currentGoal.theme + "-bg");
      }

      return classList.toString().replace(/,/g, " ");
    };

    $scope.dayTag = function(w, i) {
      return "d" + moment().year(w.year).week(w.week).day(i).format("YYYYMMDD");
    };

    $scope.isCalendarOverflow = function(d, scope) {
      return (scope.$last && d < 8);
    };

    $scope.initChains = function() {
      $scope.chains = [];
      $scope.longestChain = 0;
      $scope.currentChainLength = 0;

      var allChains = $scope.currentGoal.chains.slice(0);

      if ($scope.currentGoal.currentChain != null) {
        allChains.push($scope.currentGoal.currentChain);
      }

      for (i = 0; i < allChains.length; i++) {
        var startDay = moment(allChains[i].startDate);
        var endDay = moment(allChains[i].endDate);
        var daysDiff = endDay.diff(startDay, 'days') + 1;

        if (daysDiff > 1) {
          $scope.chains["d" + startDay.format("YYYYMMDD")] = "startDayChain";

          for (j = 0; j < daysDiff - 2; j++) {
            $scope.chains["d" + startDay.add(1, 'days').format("YYYYMMDD")] = "middleDayChain";
          }

          $scope.chains["d" + startDay.add(1, 'days').format("YYYYMMDD")] = "endDayChain";
        } else {
          $scope.chains["d" + startDay.format("YYYYMMDD")] = "singleDayChain";
        }

        if (daysDiff > $scope.longestChain) {
          $scope.longestChain = daysDiff;
        }

        if ($scope.currentGoal.currentChain != null && i == allChains.length - 1) {
          $scope.currentChainLength = daysDiff;
        }
      }
    };
  });

})();