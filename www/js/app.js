(function(){

  var app = angular.module('OneUp', ['ionic', 'OneUp-Goal', 'OneUp-AddGoal', 'OneUp-Settings'])

  tempDate = new Date();
  tempStartDate1 = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() - 7);
  tempStartDate2 = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() - 36);
  tempStartDate3 = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() - 21);

  var goals = [
                { title: 'Stop Smoking', icon: "ion-no-smoking", theme: "positive", checkedToday: true, startDate: tempStartDate1 },
                { title: 'Daily Run', icon: "ion-trophy", theme: "assertive", checkedToday: false, startDate: tempStartDate2 },
                { title: 'App Development', icon: "ion-iphone", theme: "calm", checkedToday: true, startDate: tempStartDate3 }
              ];

  function updateGoals() {
    var today = new Date();

    for (i = 0; i < goals.length; i++) {
      goals[i].progress = (today - goals[i].startDate) / 86400000;
    }
  }

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

      updateGoals();

      $ionicPlatform.ready(function() {
        document.addEventListener("resume", function() {
          updateGoals();
        }, false);
      });
    });
  });

  app.controller('ListCtrl', function($scope){
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

    $scope.goals = goals;
    
    $scope.updateGoals = function() {
      updateGoals();
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
  
  app.filter('dayCount', function() {
    return function(input) {
      return Math.ceil(input);
    };
  });

})();