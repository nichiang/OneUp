(function(){
  
  var settings = angular.module('OneUp-Settings', ['ionic'])

  settings.controller('SettingsCtrl', function($scope, $ionicModal){
    $scope.currentDate = new Date();
    $scope.currentDate.setDate(1);

    $ionicModal.fromTemplateUrl('settings-modal.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openSettingsModal = function() {
      /*var options = {
        date: new Date(),
        mode: 'date'
      };

      datePicker.show(options, function(date){
        alert("date result " + date);  
      });*/
      
      $scope.modal.show()
    }

    $scope.closeSettingsModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });

})();