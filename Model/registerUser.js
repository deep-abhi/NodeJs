var fs = require('fs');

module.exports.addUserCredentials = function (req, callback) {
  var newJson;
  fs.readFile("./JsonData/userCredentials.json", 'utf8', function (err, data) {
    var newData = JSON.parse(data);
    var nextCount = Object.keys(newData).length + 1;
    var newUser = "user" + nextCount;
    newData[newUser] = {
      "username": req.body.userName,
      "password": req.body.password,
    }
    newJson = JSON.stringify(newData);
    fs.writeFile("./JsonData/userCredentials.json",newJson,function(err,data){
      callback(null,newUser,req,);
    });
  });
}

module.exports.addUser = function (user,req, callback) {
  var newJson;
  fs.readFile("./JsonData/Users.json", 'utf8', function (err, data) {
    var newData = JSON.parse(data);
    newData[user] = {
      "name": req.body.name,
      "age": req.body.age,
      "gender": req.body.gender
    }
    newJson = JSON.stringify(newData);
    callback(null, newJson);
  });
}

module.exports.saveUser = function(newJson,callback){
  fs.writeFile("./JsonData/Users.json",newJson,function(err){
    if(err) throw (err)
    callback(null,"Data Stored successfully");
  });
}
