(function(){

  var app = angular.module('OneUp', ['ionic', 'OneUp-Goal', 'OneUp-AddGoal', 'OneUp-Settings'])

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

  app.controller('ListCtrl', function($scope){
    $scope.iconWidths = {
      'ion-arrow-right-b': 15,
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

    $scope.goals = [
      { title: 'Stop Smoking', progress: 30, icon: "ion-no-smoking", theme: "positive", checkedToday: true },
      { title: 'Daily Run', progress: 75, icon: "ion-trophy", theme: "assertive", checkedToday: false },
      { title: 'App Development', progress: 66, icon: "ion-iphone", theme: "calm", checkedToday: true }
    ];

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
  
})();