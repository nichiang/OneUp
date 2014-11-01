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

    $scope.getProgress = function(g) {
      var today = new Date();
      var start = Date.parse(g.startDate);
      var end = Date.parse(g.targetDate);

      return Math.min(((today - start) / (end - start)) * 100, 100);
    };

    $scope.checkTodayToggle = function(g) {
      g.checkedToday = !g.checkedToday;
    }

    $scope.checkTodayClass = function(g) {
      if (g.checkedToday) {
        return ['button', 'button-large', 'checkTodayButton', 'button-' + g.theme];
      } else {
        return ['button', 'checkTodayButton', 'button-stable'];
      }
    };
  });

/*  app.filter('progress', function() {
    return function(input) {
      var today = new Date();
      var start = Date.parse(input.startDate);
      var end = Date.parse(input.targetDate);

      return ((today - start) / (end - start)) * 100;
    };
  });*/

  app.filter('progressDay', function() {
    return function(input) {
      var today = new Date();
      var start = Date.parse(input.startDate);

      return Math.ceil((today - start) / 86400000);
    };
  });


})();