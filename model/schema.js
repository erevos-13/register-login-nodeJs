/*

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var login = new Schema({

    username : String,
    password : String
});




module.exports = mongoose.model('usersinsert', login);

*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var bcrypt = require('bcrypt');
const saltRounds = 10;





var Schema = mongoose.Schema;

var login = new Schema({

    username: String,
    password: String
});

//here make the model
var userinsert =  mongoose.model('usersinsert', login);




 // here we output the hash of the password.
 var hashOutput = function hash(myPassword, username) {
    bcrypt.hash(myPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        var UsersInsert = userinsert({
            username : username,
            password : hash
        });
        UsersInsert.save(function (err) {
            if (err) throw err;
            console.log('person login validation '+ UsersInsert.username +' save');
        });
    });

};


 var check = function (myPassword, hash) {
     bcrypt.compare(myPassword, hash, function(err, res) {
         // res == true
         console.log('check is :'+ res);

     });
     return true;
 };




exports.hashOutput = hashOutput;
exports.check = check;
exports.userinsert= userinsert;
