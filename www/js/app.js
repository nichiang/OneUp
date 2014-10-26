(function(){

  var app = angular.module('OneUp', ['ionic', 'OneUp-Goal'])

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
      { title: 'Stop Smoking', progress: 35 },
      { title: 'Daily Run', progress: 55 },
      { title: 'App Development', progress: 80 }
      ];
  });
  
})();