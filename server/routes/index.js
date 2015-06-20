var express = require('express');
var router = express.Router();
var passport = require('passport');
var arrowUsers = require('../models/arrowUsers');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index.ejs');
});

/* GET profile page. */
router.get('/profile', function(req, res) {
	if (req.session.user) {
		res.render('profile.ejs', {
			user: req.session.user
		});
	} else {
		res.redirect('/login');
	}
});

/* GET logout route. */
router.get('/logout', function(req, res) {
	req.session = null;
	res.redirect('/');
});

/* GET login page. */
router.get('/login', function(req, res) {
	res.render('login.ejs', {
		message: []
	});
});

/* POST login data. */
router.post('/login', function(req, res) {
	arrowUsers.loginUser(req.body.email, req.body.password, function(session, user) {
		console.log('Login: ' + session);
		if (session) {
			req.session.user = user;
			res.redirect('/profile');
		}
	})
});

/* GET signup page. */
router.get('/signup', function(req, res) {
	res.render('signup.ejs', {
		message: []
	});
});

/* POST signup data. */
router.post('/signup', function(req, res) {
	arrowUsers.createUser(req.body.email, req.body.first_name, req.body.last_name, req.body.password, function(session) {
		if (session) {
			req.session = session;
			res.redirect('/');
		}
	});

});

module.exports = router;