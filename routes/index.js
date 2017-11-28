var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var Courses = require('../models/course');
var Lesson = require('../models/lesson');
var UserInCourses = require('../models/userincourse');
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
		UserInCourses.find( { user : req.user.username } ,function (err, userInCourses){
			res.render('home', { user: req.user, courseList : userInCourses  });	
		});
		
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Show notes in one class */
	router.post('/studentLessonPage', function(req, res) {
		UserInLessons.find( {user: req.user.username, courseID : req.body.courseID} ,function(err, userInLessons){
			res.render('studentLessonPage',{username : req.user.username, courseName : req.body.courseName, lessonInfo : userInLessons});	
			
		});
	});

	router.post('/teacherLessonPage', function(req, res) {
		UserInLessons.find( {user: req.user.username, courseID : req.body.courseID} ,function(err, userInLessons){
			res.render('teacherLessonPage',{username :req.user.username, courseName : req.body.courseName, lessonInfo : userInLessons});	
			
		});
	});

	router.post('/note-taking', function(req, res) {
		var username = req.user.username;
		var lessonNum = req.body.lessonNum;
		var lessonTitle = req.body.lessonTitle;
		var courseID = req.body.courseID;
		Users.find( { username : username }, function(err, userTakingNotes){
			res.render('noteTakingPage', {user : userTakingNotes[0] , lessonNum : lessonNum, courseID : courseID , lessonTitle :lessonTitle});
		});
	});

	router.get('/testajx',function(req,res){
		res.send('Hi!');
	});

	return router;
}