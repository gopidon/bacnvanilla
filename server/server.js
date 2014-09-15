var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');


var app = module.exports = loopback();

var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// Set up the favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());



// -- Add your pre-processing middleware here --
app.use(loopback.cookieParser('246bace2-38cb-4138-85d9-0ae8160b07c8'));
app.use(loopback.token({model: app.models.accessToken}));
app.use(loopback.methodOverride());
app.use(loopback.session({ secret: 'keyboard cat' }));

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

// boot scripts mount components like REST API
boot(app, __dirname);

var config = {};
try {
    config = require('../providers.json');
} catch(err) {
    console.error('Please configure your passport strategy in `providers.json`.');
    process.exit(1);
}

passportConfigurator.init();
passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
});

for(var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/home', function(req, res, next){
    var user = req.user;
    var myUser = {};
    if(user != undefined){
        myUser.id = user.id;
        myUser.displayName = user.profiles[0].profile.displayName;
        myUser.fbToken = user.profiles[0].credentials.accessToken;
        myUser.accessToken = req.signedCookies.access_token;
    }
    res.render('main', {
        user : req.user ? myUser : null// get the user out of session and pass to template
    });
});

app.post('/uploadVideo', multipart(), function(req,res,next){
    console.log("In Upload Video");
    var temp = req.files.file.path;
    fs.readFile(temp, function (err, data) {
        // ...

        console.log(temp);
        var newPath = path.resolve(__dirname,"../uploads/"+req.files.file.name);

        fs.writeFile(newPath, data, function (err) {
            fs.unlinkSync(temp);
            res.redirect("back");
        });
    });
    //next();
})


app.get('/logout', function(req,res,next){
    req.logout();
    res.redirect("/home");
});

// -- Mount static files here--
app.use(loopback.static(path.resolve(__dirname, '../client')));
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
//   var path = require('path');
//   app.use(loopback.static(path.resolve(__dirname, '../client')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

var swaggerRemote = app.remotes().exports.swagger;
if (swaggerRemote) {
    swaggerRemote.requireToken = false;
}

app.enableAuth();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
