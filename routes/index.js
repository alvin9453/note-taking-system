var express = require('express');
var router = express.Router();
var Classes = require('../models/class');
var UserInClasses = require('../models/userinclass');
var UserInLessons = require('../models/userinlesson');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		UserInClasses.find( { user : req.user.username } ,function (err, userInClasses){
			console.log(userInClasses);
			res.render('home', { user: req.user, classList : userInClasses  });	
		});
		
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Show notes in one class */
	router.post('/notesInOneClass', function(req, res) {
		UserInLessons.find( {user: req.body.username, classID : req.body.classID} ,function(err, userInLessons){
			console.log(userInLessons);
//			if(!userInLessons){
//				var empty = [];
//				res.render('notesInOneClass',{user:req.body.username, className : req.body.className , lessonInfo : empty});
//			}
//			else{
				res.render('notesInOneClass',{user:req.body.username, className : req.body.className, lessonInfo : userInLessons});	
//			}
			
		});
	});

	return router;
}