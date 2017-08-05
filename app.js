
var express = require('express');
var flash = require('express-flash');
var app = express();

// var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var SchemaLogin = require('./model/schema');
var session = require('express-session');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
// the require files



app.get('/', function (req, res) {

    res.send('<button><a href="register" >Register</a></button><br> <p>This is a simple login</p><br><button><a href="login" >Login</a></button><br>');

});


app.get('/register',function (req,res) {

    res.render('index');

});

app.post('/register', function (req, res, next) {

    var myPassword = req.body.password;
    var userName = req.body.username;

    SchemaLogin.hashOutput(myPassword,userName);


    res.send('<p>ok</p><br><a href="/find" >Find</a>' );

});


app.get('/login',function (req, res, next) {

    res.render('login', { ErrorPassword : false });

});

app.post('/login',function (req, res, next) {
//    here i we make the check for the password
    var myPassword = req.body.password;
    var userName = req.body.username;
    var SessionName = req.session.nameSession = userName;
    SchemaLogin.userinsert.find({"username": userName}, function (err, obj) {
        if (err) throw err;

        // object of all the users
        console.log(obj[0].password);
        var hashFromdb = obj[0].password;
        var isTrue = SchemaLogin.check(myPassword, hashFromdb);
        console.log(SchemaLogin.check(myPassword, hashFromdb));
        if(isTrue) {
            res.send('<p>The password has been check ok. you are the </p>');
        }else {
            res.render('login', { ErrorPassword : 'wrong Password' });
        }
    next();
    });



});


app.get('/find', function (req, res, next) {


    console.log(req.url);
    // get all the users
    SchemaLogin.userinsert.find({}, function (err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);

        res.render('find', {Name: users});

        next();
    });

});




app.listen(3000,function () {
    console.log('your app is listen in 3000');

});