var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');
var passport = require('passport');
var OpenidConnectStrategy = require('passport-openidconnect').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション定義
app.use(session({ secret: 'secret', key: 'key',})) //cookieParserよりあとに記述しないとNGとなるので注意

// Open ID Connect定義
app.use(passport.initialize());
app.use(passport.session());

passport.use(new OpenidConnectStrategy({
    authorizationURL: "https://accounts.google.com/o/oauth2/auth",
    tokenURL: "https://accounts.google.com/o/oauth2/token",
    userInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo",
    clientID: "あなたのクライアントID",
    clientSecret: "あなたのクライアントシークレット",
    callbackURL: "あなたのリダイレクトURI",
    scope: ["openid"]
    },
    function( accessToken, refreshToken, profile, req, res, done){
     process.nextTick(function(){
     done(null ,profile);
     //　取得したアクセストークンや、UserInfoエンドポイントから取得したものを使うのであれば
     // ここで色々行う
     });
}));

// Open ID Connectのユーザ情報を格納するpassportのシリアライズ(認証OKの場合)
passport.serializeUser(function(user, done){
  done(null, user);
});

// Open ID Connectのユーザ情報を格納するpassportのデシリアライズ(認証NGの場合)
passport.deserializeUser(function(obj, done){
  done(null, obj);
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
