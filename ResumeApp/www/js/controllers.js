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


.controller('RecruiterHomeCtrl', function($scope, $state,$filter,$q,LoginService,$http) {
   
    $scope.candidateList=new Array();
    
      $scope.getData=function(){           
          $http({
        method: 'GET',
        url : 'https://api.mlab.com/api/1/databases/asedemo/collections/resumedb?apiKey=i6Kabqc-LHECJKyDttmt1mPXR50yIZ1o'

      }).success(function(data) {
             console.log(" get all the details"+data);              
             var candidateList1=data;   
             //$scope.candidateList=JSON.parse(data);     
             console.log(" get all the details"+ candidateList1[0].name);
              for (var i = 0; i < 3; i++) {
								console.log("Inside loop" + i);
                  $scope.candidateList[i] = {

									"name": candidateList1[i].name,
									"skills": candidateList1[i].skills
									
								};
              }
      })
    }

    $scope.delete = function(id,callback){
        var api_key=i6Kabqc-LHECJKyDttmt1mPXR50yIZ1o;
        var URI = 'https://api.mlab.com/api/1/databases/asedemo/collections/resumedb?apiKey=' + API_KEY + '&q={"id":'+'"'+id + '"'+ '}'
			var Empty = JSON.stringify({'':''})
			return $http.put(URI,Empty,config);
    }


    $scope.update = function(candidate,callback){

         var Data = JSON.stringify({
				name : candidate.name,
                skills: candidate.skills,
                resume: candidate.resume
			});
        var api_key=i6Kabqc-LHECJKyDttmt1mPXR50yIZ1o;
			var URI = 'https://api.mlab.com/api/1/databases/asedemo/collections/resumedb?apiKey=' + API_KEY + '&q={"name":' +'"'+name + '"'+ '}'
			
			return $http.put(URI,Data,config)
    }

    
})


.controller('uploadCtrl', function($scope, $state,$filter,$q,$http,$window) {
    
    
    $scope.linkedInlogin=function(){
        
        var clientId="786gp01v53psvr";
        var clientsecret="66biVKvvtU13lPdq";
        
        
    }
    
    $scope.buildResume=function(fname,lname,skills,email,objective,univ,year,phone){
        
        console.log("inside build reesume"+phone);  
         console.log("inside build reesume"+objective); 
        
        $http({
         method: 'POST',
         url : 'https://api.mlab.com/api/1/databases/asedemo/collections/resumedb?apiKey=i6Kabqc-LHECJKyDttmt1mPXR50yIZ1o',
         data: JSON.stringify({
           name : fname+" "+lname,
           skills: skills,
           resume: email+" "+objective+" "+univ+" "+year+" "+phone
         }),
         contentType: "application/json"
       }).success(function() {
         $scope.status ="User resume created successfully";
       }).error(function(data){
         $scope.status = "User resume Cannot be Created";
       })
    }
})

.controller('CandidateCtrl', function($scope, $state,$filter,$q,LoginService,$http) {
   
    $scope.candidateList=new Array();
    
      $scope.getData=function(){           
          $http({
        method: 'GET',
        url : 'https://api.mlab.com/api/1/databases/asedemo/collections/resumedb?apiKey=i6Kabqc-LHECJKyDttmt1mPXR50yIZ1o'

      }).success(function(data) {
             console.log(" get all the details"+data);              
             var candidateList1=data;   
             //$scope.candidateList=JSON.parse(data);     
             console.log(" get all the details"+ candidateList1[0].name);
              for (var i = 0; i < 4; i++) {
								console.log("Inside loop" + i);
                  $scope.candidateList[i] = {

									"name": candidateList1[i].name,
									"skills": candidateList1[i].skills
									
								};
              }
      })
    }

   

    
})



