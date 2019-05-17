var fs = require('fs');
module.exports.updateUser = function(req,callback){
    var isValidId;
    fs.readFile("./JsonData/Users.json","utf8",function(err,data){
        var users = JSON.parse(data);
        var user = users["user"+req.query.id];
        
        callback(null,"Development-Inprogress");
      })
}