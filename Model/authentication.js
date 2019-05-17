var fs = require('fs');

module.exports.authenticateUser = function (req,callback) {
    var isauthenticated ;
    fs.readFile("./JsonData/userCredentials.json", 'utf8', function (err, data) {
        var newData = JSON.parse(data);
        for (var key in newData) {
            if (newData.hasOwnProperty(key)) {
                var val = newData[key];
                if ((val.username == req.header('username')) && (val.password == req.header('password'))) {
                    isauthenticated = true;
                    break;
                }
            }
        }
        console.log(isauthenticated);
        if (isauthenticated) {
            callback(null, req);
           
        } else {
             callback("Authentication Fail", req);
            
        }
    });
    
}