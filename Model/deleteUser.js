var fs = require('fs');
module.exports.deleteUser = function (req, callback) {
    var newJson;
    fs.readFile("./JsonData/Users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var userId = "user" + req.query.id;
        delete users[userId];
        newJson = JSON.stringify(users);
        callback(null,newJson);
    });
}
module.exports.saveUser = function (newJson, callback) {
    fs.writeFile("./JsonData/Users.json", newJson, function (err) {
        if (err) throw (err)
        callback(null, "Data deleted");
    });
}
