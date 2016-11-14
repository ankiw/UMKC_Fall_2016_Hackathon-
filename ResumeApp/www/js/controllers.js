angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('RecruiterCtrl', function($scope,LoginService,$ionicPopup, $state,$q) {
 
  $scope.data = {};
    $scope.IsLogedIn= false;
    $scope.Submitted= false;
    $scope.IsFormValid=false;
    $scope.Message='';
    $scope.data={
        userName:'',
        pwd:''
    };
    
     $scope.$watch('form.$valid',function(newVal){
        $scope.IsFormValid=newVal;
    });    
  
   $scope.loginrecruiter = function() {
       
        $scope.Submitted=true;
        $scope.IsFormValid=true;
        if($scope.IsFormValid){
             console.log("inside recruiter login");
            LoginService.isDuplicate($scope.data)
                .then(function (response) {
                    if (response.success) {
                         console.log("inside recruiter login 11");
                       $state.go('tab.recuiterhome');
                    }
                    else{
                        $scope.Message="Invalid Credentials";
                    }
                });
        }
    };
    
      $scope.goToRegisterPage = function() {  
        console.log("Inside register");            
        $state.go('register');           
       
    };
})


.controller('registerCtrl', function($scope, $state,$filter,$q,LoginService) {
   
     $scope.registerData={
        un:'',
        pwd:''
    };
    
    $scope.cancel=function(){
        $state.go('tab.recruiter');   
    }
    
     $scope.register = function() {  
        console.log("Inside register"+ $scope.registerData.un+" "+$scope.registerData.pwd);
        $scope.RegSubmitted=true;
        $scope.IsRegLogedIn=true;
        LoginService.CreateUser($scope.registerData)
            .then(function (response) {
                if (response.success) {                   
                    $scope.status="Thank you "+$scope.registerData.name+" for Signing up with us";
                }
                else{                   
                    $scope.status="Username "+$scope.registerData.un+" already exists.Please try again";
                }
            });
      }
})


.controller('RecruiterHomeCtrl', function($scope, $state,$filter,$q,LoginService) {
   
     $scope.registerData={
        un:'',
        pwd:''
    };
    
    $scope.cancel=function(){
        $state.go('tab.recruiter');   
    }
    
    
})


.controller('uploadCtrl', function($scope, $state,$filter,$q,LoginService) {
    
    
    $scope.linkedInlogin=function(){
        
        
        https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=123456789&redirect_uri=https%3A%2F%2Fwww.example.com%2Fauth%2Flinkedin&state=987654321&scope=r_basicprofile
    }
})

