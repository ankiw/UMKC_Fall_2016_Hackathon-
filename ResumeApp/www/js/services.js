angular.module('starter.services', [])

.factory('LoginService',function($filter,$q){
        var service = {};
        service.GetUsernames = GetUsernames;
        service.CreateUser = CreateUser;
        service.isDuplicate = isDuplicate;
        service.getCredentials = getCredentials;

        return service;
    
    
        function getCredentials(LoginData){
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { Username: LoginData.un },{ Password: LoginData.pwd });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
        function isDuplicate(LoginData){
            var deferred = $q.defer();
            getCredentials(LoginData)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({ success: true });
                    } else {
                        deferred.resolve({ success: false, message: 'Invalid Credentails '});
                    }
                });
            return deferred.promise;
        }
        function CreateUser(registerData){
            var deferred = $q.defer();
            GetUsernames(registerData.un)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        console.log("duplicate  un:"+registerData.un+" "+registerData.pwd);
                        deferred.resolve({ success: false, message: 'Username "' + registerData.un + '" is already taken' });
                    } else {
                        var users = getUsers();
                        users.push(registerData);
                        setUsers(users);
                        deferred.resolve({ success: true });
                    }
                });
            return deferred.promise;
        };
        function GetUsernames(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { un: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        };
        function getUsers(){
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        };
        function setUsers(users){
            localStorage.users = JSON.stringify(users);
        };
    })


