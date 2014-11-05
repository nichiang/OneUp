(function(){

  var app = angular.module('OneUp', ['ionic', 'ngCordova', 'OneUp-Goal', 'OneUp-AddGoal', 'OneUp-Settings']);

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

  app.controller('ListCtrl', function($scope, $window, $document, $ionicScrollDelegate){
    $scope.iconWidths = {
      'ion-arrow-right-c': 28,
      'ion-flag': 30,
      'ion-heart': 33,
      'ion-settings': 33,
      'ion-document-text': 23,
      'ion-map': 35,
      'ion-pie-graph': 35,
      'ion-aperture': 35,
      'ion-iphone': 15,
      'ion-code': 35,
      'ion-bug': 35,
      'ion-game-controller-b': 35,
      'ion-videocamera': 35,
      'ion-music-note': 30,
      'ion-cash': 40,
      'ion-trophy': 35,
      'ion-university': 35,
      'ion-beaker': 30,
      'ion-lightbulb': 20,
      'ion-no-smoking': 35
    };

    $scope.goals = angular.fromJson($window.localStorage['goals'] || '[]');

    // for (i = 0; i < $scope.goals.length; i++) {
    //   $scope.updateChains($scope.goals[i]);
    // }

    $scope.headerScrollPosition = 0;

    $scope.scrollHeader = function() {
      var amt = 0 - ($ionicScrollDelegate.getScrollPosition().top * 0.5);
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
    }

    $scope.initGoal = function(g) {
      var today = moment().startOf('day');

      g.checkedToday = (g.currentChain != null && moment(g.currentChain.endDate).isSame(today));
      g.progress = $scope.getProgress(g);

      $scope.updateChains(g);
    }

    $scope.getProgress = function(g) {
      var today = moment().startOf('day');
      var start = moment(g.startDate);
      var end = moment(g.targetDate);

      return Math.min((today.diff(start, 'days') / end.diff(start, 'days')) * 100, 100);
    };

    $scope.updateChains = function(g) {
      var checkDay = moment().startOf('day').subtract(1, 'days');

      if (g.currentChain != null && moment(g.currentChain.endDate).isBefore(checkDay)) {
        g.chains.push(g.currentChain);
        g.currentChain = null;
      }
    };

    $scope.checkTodayToggle = function(g) {
      var today = moment().startOf('day').toDate();

      if (!g.checkedToday) {
        if (g.currentChain == null) {
          g.currentChain = {startDate: today, endDate: today};
        } else {
          g.currentChain.endDate = today;
        }
      } else {
        if (g.currentChain != null && g.currentChain.startDate === g.currentChain.endDate) {
          g.currentChain = null;
        } else {
          g.currentChain.endDate = moment().startOf('day').subtract(1, 'day').toDate();
        }
      }

      $window.localStorage['goals'] = JSON.stringify($scope.goals);
      g.checkedToday = !g.checkedToday;
    };

    $scope.checkTodayClass = function(g) {
      if (g.checkedToday) {
        return ['button', 'button-large', 'checkTodayButton', 'button-' + g.theme];
      } else {
        return ['button', 'checkTodayButton', 'button-stable'];
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