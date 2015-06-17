var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index.ejs');
});

/* GET profile page. */
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {
		user: req.user
	});
});

// function to check if user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	// if not logged go to default route
	res.redirect('/');
}

/* GET logout route. */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

/* GET login page. */
router.get('/login', function(req, res) {
	res.render('login.ejs', {
		message: req.flash('loginMessage')
	});
});

/* POST login data. */
router.post('/login', passport.authenticate('local-login', {
	//Success go to Profile Page / Fail go to login page
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

/* GET signup page. */
router.get('/signup', function(req, res) {
	res.render('signup.ejs', {
		message: req.flash('signupMessage')
	});
});

/* POST signup data. */
router.post('/signup', passport.authenticate('local-signup', {
	//Success go to Profile Page / Fail go to Signup page
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

module.exports = router;