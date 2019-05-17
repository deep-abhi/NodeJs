var fs = require("fs");
module.exports.getallUser = function (req,callback) {
    fs.readFile( "./JsonData/Users.json", 'utf8', function (err, data) {
         callback(null,data);
    });

}
module.exports.getUser = function(req,callback){
    var isValidId;
    fs.readFile("./JsonData/Users.json","utf8",function(err,data){
        var users = JSON.parse(data);
        var user = users["user"+req.query.id];
        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                var val = users[key];
                if(val == user){
                    isValidId = true;
                    break;
                }
                
            }
        }
        if(isValidId){
            callback(null,JSON.stringify(user));
        }else{
            callback("Invalid User",null);
        }
       
      })
}
