var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

router.get('/', function(req, res, next) {
	res.render('index.ejs', { message: req.flash('loginMessage') });
});

router.get('/changePassword', isAuthenticated, function(req, res, next) {
	res.render('changePassword.ejs', { user: req.user.local.email });
});

router.get('/signup', isAuthenticated, function(req, res) {
	res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/home', isAuthenticated, function(req, res) {
	console.log("req", req);
	if(req.user.local.firstLogin){
		res.redirect('/changePassword');
	}else {
		res.render('home.ejs', {user: req.user});
	}
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/home',
	failureRedirect: '/login',
	failureFlash: true
}));


// router.post('/login', passport.authenticate('local-login'), function(req,res, err){
// 	console.log(err);
// 	if(req.user.local.firstLogin){
// 		res.redirect('/changePassword');
// 	}else{
// 		res.redirect('/home');
// 	}
// });


router.post('/changePassword', isAuthenticated, passport.authenticate('local-reset', {
	successRedirect: '/home',
	failureRedirect: '/changePassword',
	failureFlash: true
}));

module.exports = router;


