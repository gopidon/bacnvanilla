/**
 * Created by gopi on 8/22/14.
 */
var app = require('../server');
var Q = require('q');
var dataSource = app.dataSources.bacnvanilla;


function createAccessTokenTable(){
    var deferred = Q.defer();
    dataSource.automigrate('AccessToken', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table AccessToken");
            deferred.resolve("CREATED table AccessToken");
        }
    });
    return deferred.promise;
};

function createACLTable(){
    var deferred = Q.defer();
    dataSource.automigrate('acl', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table acl");
            deferred.resolve("CREATED table acl");
        }
    });
    return deferred.promise;
};

function createRoleMappingTable(){
    var deferred = Q.defer();
    dataSource.automigrate('roleMapping', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table roleMapping");
            deferred.resolve("CREATED table roleMapping");
        }
    });
    return deferred.promise;
};

function createRoleTable(){
    var deferred = Q.defer();
    dataSource.automigrate('role', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table role");
            deferred.resolve("CREATED table role");
        }
    });
    return deferred.promise;
};

function createUserIdentityTable(){
    var deferred = Q.defer();
    dataSource.automigrate('userIdentity', function(err){
        if(err){
            console.log("Error:"+err);
            deferred.reject(err);
        }
        else{
            console.log("CREATED table userIdentity");
            deferred.resolve("CREATED table userIdentity");
        }
    });
    return deferred.promise;
};

function createUserCredentialTable(){
    var deferred = Q.defer();
    dataSource.automigrate('userCredential', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table userCredential");
            deferred.resolve("CREATED table userCredential");
        }
    });
    return deferred.promise;
};

function createUserTable(){
    var deferred = Q.defer();
    dataSource.automigrate('user', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table user");
            deferred.resolve("CREATED table user");
        }
    });
    return deferred.promise;
};




console.log("*********Get ready! Creating TABLES***********");
createUserTable()
    .then(function(data){
        return createRoleMappingTable();
    })
    .then(function(data){
        return createRoleTable();
    })
    .then(function(data){
        return createACLTable();
    })
    .then(function(data){
        return createUserIdentityTable();
    })
    .then(function(data){
        return createUserCredentialTable();
    })
    .then(function(data){
        return createAccessTokenTable();
    })
    .done(function(){
        console.log("**********All tables successfully created*************");
        dataSource.disconnect();
    }, function(err){
        console.log("Error occured while creating tables .... : "+err);
        dataSource.disconnect();
    });





/*dataSource.automigrate('User', function (err) {
    console.log("Created User table");
    console.log("Creating a user ....");
    User.create({email: 'foo@bar.com', password: 'bar'}, function(err, user) {
        if(err) {
            console.log("Error creating a user: " + err);
        }
        else {
            console.log("User: "+user);
            console.log("Fetching accessToken ....")
            User.login({email: 'foo@bar.com', password: 'bar'}, function(err, accessToken) {
                if(err){
                    console.log("Error fetching accessToken: "+accessToken);
                }
                else {
                    console.log("Access Token: "+accessToken);
                }
            });
        }

    });
});*/
