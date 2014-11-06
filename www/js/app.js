(function(){

  var app = angular.module('OneUp', ['ionic', 'ngCordova', 'OneUp-Goal', 'OneUp-AddEditGoal', 'OneUp-Popovers', 'OneUp-Settings']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.controller('ListCtrl', function($scope, $window){
    $scope.goals = angular.fromJson($window.localStorage['goals'] || '[]');
  });

  app.directive('oneupParallaxHeader', function($document, $ionicScrollDelegate) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.bind('scroll', function() {
          var amt = 0 - ($ionicScrollDelegate.getScrollPosition().top * 0.8);
          var fadeAmt = 1 - (($ionicScrollDelegate.getScrollPosition().top - 80) / 30);

          ionic.requestAnimationFrame(function() {
            var appHeader = $document[0].body.querySelector('#appHeader');
            var headerElements = $document[0].body.querySelector('.headerElements');

            appHeader.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + amt + 'px, 0)';
            
            headerElements.style.opacity = fadeAmt;

            if (fadeAmt <= 0) {
              headerElements.style.visibility = "hidden";  
            } else {
              headerElements.style.visibility = "visible";  
            }
          });
        });
      }
    };
  });

  app.directive('oneupGoalRow', function() {
    return {
      restrict: 'E',
      scope: {
        goal: '=',
        allGoals: '='
      },
      templateUrl: 'goal-row-template.html',
      controller: function($scope, $window) {
        $scope.iconWidths = {
          'ion-arrow-right-c': 28, 'ion-flag': 30, 'ion-heart': 33, 'ion-settings': 33, 'ion-document-text': 23, 'ion-map': 35, 'ion-pie-graph': 35, 'ion-aperture': 35, 'ion-iphone': 15, 'ion-code': 35, 'ion-bug': 35, 'ion-game-controller-b': 35, 'ion-videocamera': 35, 'ion-music-note': 30, 'ion-cash': 40, 'ion-trophy': 35, 'ion-university': 35, 'ion-beaker': 30, 'ion-lightbulb': 20, 'ion-no-smoking': 35 
        };

        this.goal = $scope.goal;

        this.checkTodayToggle = function() {
          var today = moment().startOf('day').toDate();

          if (!this.goal.checkedToday) {
            if (this.goal.currentChain == null) {
              this.goal.currentChain = {startDate: today, endDate: today};
            } else {
              this.goal.currentChain.endDate = today;
            }
          } else {
            if (this.goal.currentChain != null && this.goal.currentChain.startDate === this.goal.currentChain.endDate) {
              this.goal.currentChain = null;
            } else {
              this.goal.currentChain.endDate = moment().startOf('day').subtract(1, 'day').toDate();
            }
          }

          $window.localStorage['goals'] = JSON.stringify($scope.allGoals);
          this.goal.checkedToday = !this.goal.checkedToday;
        };

        this.checkTodayClass = function() {
          if (this.goal.checkedToday) {
            return ['button', 'button-large', 'checkTodayButton', 'paper-shadow-top-z-1', 'button-' + this.goal.theme];
          } else {
            return ['button', 'checkTodayButton', 'paper-shadow-top-z-2', 'button-stable'];
          }
        };

        $scope.getProgress = function() {
          var today = moment().startOf('day');
          var start = moment(this.goal.startDate);
          var end = moment(this.goal.targetDate);

          return Math.min((today.diff(start, 'days') / end.diff(start, 'days')) * 100, 100);
        };

        $scope.updateChains = function() {
          var checkDay = moment().startOf('day').subtract(1, 'days');

          if (this.goal.currentChain != null && moment(this.goal.currentChain.endDate).isBefore(checkDay)) {
            this.goal.chains.push(this.goal.currentChain);
            this.goal.currentChain = null;
          }
        };
      },
      controllerAs: 'goalRowCtrl',
      link: function(scope, elem, attrs) {
        var today = moment().startOf('day');

        scope.goal.checkedToday = (scope.goal.currentChain != null && moment(scope.goal.currentChain.endDate).isSame(today));
        scope.goal.progress = scope.getProgress();

        scope.updateChains();
      }
    };
  });

  app.filter('progressDay', function() {
    return function(input) {
      var today = new Date();
      var start = Date.parse(input.startDate);

      return Math.ceil((today - start) / 86400000);
    };
  });


})();