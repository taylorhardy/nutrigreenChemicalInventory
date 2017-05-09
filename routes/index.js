var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../models/user');
var Chemical = require('../models/chemicals');
var Inventory = require('../models/inventory');
var Service = require('../models/services');
var Truck = require('../models/trucks');
var Equipment = require('../models/equipment');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

router.get('/', function (req, res, next) {
	res.render('index.ejs', {message: req.flash('loginMessage')});
});

router.get('/changePassword', isAuthenticated, function (req, res, next) {
	res.render('changePassword.ejs', {user: req.user.local.email});
});

router.get('/signup', isAuthenticated, function (req, res) {
	res.render('signup.ejs', {message: req.flash('signupMessage')});
});

router.get('/home', isAuthenticated, function (req, res) {
	if (req.user.local.firstLogin) {
		res.redirect('/changePassword');
	} else {
		res.render('home.ejs', {user: req.user});
	}
});
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});


router.get('/getUsers', isAuthenticated, function (req, res) {
	if (!req.user.local.isAdmin) {
		res.redirect('/home');
	} else {
		User.find({}, function (err, users) {
			var userList = [];
			for (var i = 0; i < users.length; i++) {
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

router.get('/currentUser', isAuthenticated, function (req, res) {
	res.send(req.user);
});

router.post('/resetPassword', isAuthenticated, function (req, res) {
	if (req.user.local.isAdmin) {
		User.findOne({'local.email': req.body.email}, function (err, user) {
			user.local.password = user.generateHash(req.body.password);
			user.local.firstLogin = true;
			user.local.passwordChangeDate = Date();
			user.save();
			res.send("Password Changed!");
		});

	} else {
		res.redirect('/logout');
	}
});

router.get('/getInventory', isAuthenticated, function (req, res) {

});

router.post('/addInventory', isAuthenticated, function (req, res) {

});

router.get('/getChemicals', isAuthenticated, function (req, res) {
	Chemical.find(function (err, chemicals) {
		var chemicalsList = [];
		for (var i = 0; i < chemicals.length; i++) {
			chemicalsList.push(chemicals[i])
		}
		res.send(chemicalsList);
	})
});

router.post('/addChemical', isAuthenticated, function (req, res) {

	Chemical.findOne({'chemical.name': req.body.name}, function (err, result) {
		if (err)
			res.send(err);
		if (result) {
			res.send("Chemical already exists");
		} else {
			var newChemical = new Chemical();
			newChemical.name = req.body.name;
			newChemical.type = req.body.type;
			newChemical.price = req.body.price;
			newChemical.mixUnit = req.body.mixUnit;
			newChemical.mixPerUnit = req.body.mixPerUnit;
			newChemical.amountUnit = req.body.amountUnit;
			newChemical.amountPerUnit = req.body.amountPerUnit;
			newChemical.dateAdded = Date();
			newChemical.addedBy = req.user.local.email;
			newChemical.active = true;
			newChemical.services = req.body.services;
			newChemical.save();
			res.send("Chemical Added");
		}
	});
});

router.post('/editChemical', isAuthenticated, function (req, res) {
	Chemical.findOne({'chemical.name': req.body.chemical.name}, function (err, result) {
		if (err)
			res.send(err);
		if (result) {
			result.chemical.name = req.body.chemical.name;
			result.chemical.type = req.body.chemical.type;
			result.chemical.price = req.body.chemical.price;
			result.chemical.mixUnit = req.body.chemical.mixUnit;
			result.chemical.mixPerUnit = req.body.chemical.mixPerUnit;
			result.chemical.amountUnit = req.body.chemical.amountUnit;
			result.chemical.amountPerUnit = req.body.chemical.amountPerUnit;
			result.chemical.active = req.body.chemical.active;
			result.chemical.services = req.body.chemical.services;
			result.chemical.lastModifiedDate = Date();
			result.chemical.lastModifiedUser = req.user.local.email;
			result.save();
			res.send("Chemical Edited");
		} else {
			res.send("Chemical Not Found");
		}
	});
});

router.post('/addService', isAuthenticated, function (req, res) {

	Service.findOne({'service.name': req.body.name}, function (err, result) {
		if (err)
			res.send(err);
		if (result) {
			res.send("Service already exists");
		} else {
			var newService = new Service();
			newService.service.name = req.body.name;
			newService.service.description = req.body.description;
			newService.service.dateAdded = Date();
			newService.service.addedBy = req.user.local.email;
			newService.service.active = true;
			newService.save();
			res.send("Service Added");
		}
	});
});

router.get('/getServices', isAuthenticated, function (req, res) {
	Service.find({}, function (err, services) {
		var serviceList = [];
		for (var i = 0; i < services.length; i++) {
			serviceList.push(services[i].service)
		}
		res.send(serviceList);
	})
});

router.post('/editService', isAuthenticated, function (req, res) {
	Service.findOne({'service.name': req.body.name}, function (err, result) {
		if (err)
			res.send(err);
		if (result) {
			result.service.name = req.body.name;
			result.service.description = req.body.description;
			result.service.dateAdded = Date();
			result.service.addedBy = req.user.local.email;
			result.service.active = true;
			result.save();
			res.send("Service Edited");
		} else {
			res.send("No Service Found");
		}
	});
});
router.post('/logUsage', isAuthenticated, function (req, res) {

});

router.get('/getTrucks', isAuthenticated, function (req, res) {
	Truck.find({}, function (err, trucks) {
		var truckList = [];
		for (var i = 0; i < trucks.length; i++) {
			truckList.push(trucks[i].truck)
		}
		res.send(truckList);
	})
});

router.post('/addTruck', isAuthenticated, function (req, res) {
	Service.findOne({'truck.name': req.body.name}, function (err, result) {
		if (err)
			res.send(err);
		if (result) {
			res.send("Truck already exists");
		} else {
			var newTruck = new Truck();
			newTruck.truck.name = req.body.name;
			newTruck.truck.defaultUser = req.body.defaultUser;
			newTruck.truck.dateAdded = Date();
			newTruck.truck.addedBy = req.user.local.email;
			newTruck.truck.active = true;
			newTruck.truck.equipmentAssigned = [];
			newTruck.save();
			res.send("Truck Added");
		}
	});
});

router.post('/editTruck', isAuthenticated, function (req, res) {
	Truck.findOne({'truck.name': req.body.name}, function (err, result) {
		if (err)
			res.send(err);
		if (result) {
			result.truck.name = req.body.name;
			result.truck.defaultUser = req.body.defaultUser;
			result.truck.lastModifiedDate = Date();
			result.truck.lastModifiedUser = req.user.local.email;
			result.truck.active = req.body.active;
			result.truck.equipmentAssigned = [];
			result.save();
			res.send("Truck Successfully Edited");

		} else {
			res.send("Truck Does not Exist");
		}
	});
});

router.post('/addEquipment', isAuthenticated, function (req, res) {
	Equipment.findOne({'equipment.name': req.body.name}, function (err, result) {
		if (err) {
			res.send(err);
		}
		if (result) {
			res.send("Equipment Already Exists");
		}
		else {
			var newEquipmnet = new Equipment();
			newEquipmnet.equipment.name = req.body.name;
			newEquipmnet.equipment.description = req.body.description;
			newEquipmnet.equipment.id = req.body.id;
			newEquipmnet.equipment.dateAdded = Date();
			newEquipmnet.equipment.active = true;
		}
	});
});

router.get('/getEquipment', isAuthenticated, function(req, res){
	Equipment.find({}, function (err, equipment) {
		var equipmentList = [];
		for (var i = 0; i < equipment.length; i++) {
			equipmentList.push(equipment[i].equipment)
		}
		res.send(equipmentList);
	})
});

module.exports = router;


