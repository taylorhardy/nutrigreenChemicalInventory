var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../models/user');
var Chemical = require('../models/chemical');
var Inventory = require('../models/inventory');
var Service = require('../models/services');

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


router.get('/getUsers', isAuthenticated, function(req, res){
	if(!req.user.local.isAdmin){
		console.log("not admin");
		res.redirect('/home');
	} else{
		User.find({}, function(err, users){
			console.log(users);
			var userList = [];
			for(var i = 0; i < users.length; i++ ){
				userList.push(users[i].local.email)
			}
			res.send(userList);
		})
	}
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

router.post('/changePassword', isAuthenticated, passport.authenticate('local-reset', {
	successRedirect: '/home',
	failureRedirect: '/changePassword',
	failureFlash: true
}));

//ajax routes

router.get('/currentUser',isAuthenticated, function(req, res){
	res.send(req.user);
});

router.post('/resetPassword',isAuthenticated,  function(req, res){
	if(req.user.local.isAdmin) {
		User.findOne({'local.email': req.body.email}, function (err, user) {
			console.log("user", user);
			user.local.password = user.generateHash(req.body.password);
			user.local.firstLogin = true;
			user.local.passwordChangeDate = Date();
			console.log("after change", user);
			user.save();
			res.send("Password Changed!");
		});

	} else{
		res.redirect('/logout');
	}
});

router.get('/getInventory', isAuthenticated, function(req, res){

});

router.post('/addInventory', isAuthenticated, function(req, res){

});

router.post('/addChemical', isAuthenticated, function(req, res){
	console.log(req.body.chemical);

	Chemical.findOne({ 'chemical.name':  req.body.chemical.name }, function(err, result) {
		if (err)
			res.send(err);
		if (result) {
			res.send("Chemical already exists");
		} else {
			var newChemical = new Chemical();
			console.log(newChemical);
			newChemical.chemical.name = req.body.chemical.name;
			newChemical.chemical.type = req.body.chemical.type;
			newChemical.chemical.price = req.body.chemical.price;
			newChemical.chemical.mixUnit = req.body.chemical.mixUnit;
			newChemical.chemical.mixPerUnit = req.body.chemical.mixPerUnit;
			newChemical.chemical.amountUnit = req.body.chemical.amountUnit;
			newChemical.chemical.amountPerUnit = req.body.chemical.amountPerUnit;
			newChemical.chemical.dateAdded = Date();
			newChemical.chemical.lastModifiedDate = Date();
			newChemical.chemical.lastModifiedUser = req.user.local.email;
			newChemical.chemical.active = true;
			newChemical.chemical.services = req.body.chemical.services;
			newChemical.save();
			res.send("Chemical Added");
		}
	});
});

router.post('/addService', isAuthenticated, function(req, res){
	console.log(req.body);

	Service.findOne({ 'service.name':  req.body.name }, function(err, result) {
		if (err)
			res.send(err);
		if (result) {
			res.send("Service already exists");
		} else {
			var newService = new Service();
			newService.service.name = req.body.name;
			newService.service.description = req.body.description;
			newService.service.dateAdded = Date();
			newService.service.lastModifiedDate = Date();
			newService.service.lastModifiedUser = req.user.local.email;
			newService.service.active = true;
			newService.save();
			res.send("Service Added");
		}
	});
});

router.get('/getServices', isAuthenticated, function(req, res){
		Service.find({}, function(err, services){
			console.log(services);
			var serviceList = [];
			for(var i = 0; i < services.length; i++ ){
				serviceList.push(services[i].service)
			}
			console.log(serviceList);
			res.send(serviceList);
		})
});

router.post('/logUsage', isAuthenticated, function(req, res){

});

module.exports = router;


