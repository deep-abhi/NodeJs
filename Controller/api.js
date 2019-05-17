var express = require('express');
var app = express();
var getUsers = require('../Model/getUser');
var addUsers = require('../Model/registerUser');
var delUsers = require('../Model/deleteUser');
var auth = require('../Model/authentication');
var async = require('async');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(function (req, res, next) {
    if (req.url == '/addUser') {
        next();
    } else {
        async.parallel({
            task1: auth.authenticateUser.bind(null, req)
        }, function (err, result) {
            if (err) res.send(err);
            else next();
        });
    }
})

var server = app.listen(3000, function () {
    var host = "127.0.0.1"
    var port = "3000"
    console.log("Example app listening at http://%s:%s", host, port)
})
//To Fetch the list of users

app.get('/listUsers', function (req, res) {
    async.parallel({
        task1: getUsers.getallUser.bind(null, req)
    }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result.task1);
        }
    });

});
//To add a new user

app.post('/addUser', function (req, res) {
    async.waterfall([addUsers.addUserCredentials.bind(null, req),
    addUsers.addUser,
    addUsers.saveUser], function (err, result) {
        res.send(result);
    });
});

//Get a particular user
app.get('/showDetails/', function (req, res) {
    async.parallel({
        task1: getUsers.getUser.bind(null, req)
    }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result.task1);
        }
    });

});

//delete a particular user
app.delete('/deleteUser', function (req, res) {
    async.waterfall([delUsers.deleteUser.bind(null, req),
        delUsers.saveUser], function (err, result) {
            res.send(result);
        });
});

//update the user info
app.put('/UpdateUser', function (req, res) {

});