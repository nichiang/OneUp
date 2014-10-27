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
    $scope.goals = [
      { title: 'Stop Smoking', progress: 35, icon: "ion-no-smoking", theme: "red" },
      { title: 'Daily Run', progress: 50, icon: "ion-trophy", theme: "green" },
      { title: 'App Development', progress: 80, icon: "ion-iphone", theme: "blue" }
      ];
  });
  
})();