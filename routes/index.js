var express = require('express');
var passport = require('passport');
var router = express.Router();

// Google認証
router.get('/auth/google', passport.authenticate('openidconnect'));

// Google認証コールバック
router.get('/oauth2callback', passport.authenticate('openidconnect', {
	// 認証NG
    failureRedirect: '/'
}), function(req, res) {
	// 認証OK
	req.session.user = req.session.passport.user.displayName;
	req.session.picture = req.session.passport.user._json.picture;
	res.redirect('/');
});

// home page
router.get('/', function(req, res) {
	if (req.session.user) {
		console.log("Login Done:", req.session.user);
		console.log(req.session.picture);
		if (req.session.picture){
			res.render('top', {
			user: req.session.user,
			picture: req.session.picture });
		}
		else{
		    res.render('top', {
		    user: req.session.user,
		    picture: "/images/default.jpg"});
		}
	}
	else{
		console.log("No Login");
		res.render('index', { title: 'ユーザ認証' });
	}
});

// Google認証ログアウト
router.get('/logout', function(req, res) {
	// ログアウトしてもセッション情報？が残っているのか
	// 次のログイン時にユーザ選択しなくてもログイン状態になる。
	// Cookie情報も削除しないとダメなのかな
	// ブラウザの設定かもしれない
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
