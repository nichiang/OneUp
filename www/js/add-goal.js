(function(){
  
  var addGoal = angular.module('OneUp-AddGoal', ['ionic'])

  addGoal.controller('AddGoalCtrl', function($scope, $ionicModal){
    $scope.currentDate = new Date();
    $scope.currentDate.setDate(1);

    $ionicModal.fromTemplateUrl('add-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })  

    $scope.openAddModal = function() {
      $scope.modal.show()
    }

    $scope.closeAddModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });

})();