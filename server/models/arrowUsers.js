var ArrowDB = require('arrowdb'),
    config = require('../config/config'),
    arrowDBApp = new ArrowDB(config.arrowKey, {
        autoSessionManagement: false
    });
var user_session = null;


module.exports = {

    createUser: function(email, first_name, last_name, password, callback) {
        console.log(email);
        console.log(password)
        arrowDBApp.usersCreate({
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password,
            password_confirmation: password
        }, function(err, result) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(result.body.response.users[0]);
                // If you are manually managing user sessions or cookies,
                // the method returns both a cookie and session ID.
                arrowDBApp.sessionCookieString = result.cookieString;
                sessionID = result.body.meta.session_id;
                callback(sessionID);
            }
        });
    },

    loginUser: function(email, password, callback) {
        arrowDBApp.usersLogin({
            login: email,
            password: password
        }, function(err, result) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(result.body.response.users[0]);
                // If you are manually managing user sessions or cookies,
                // the method returns both a cookie and session ID.
                arrowDBApp.sessionCookieString = result.cookieString;
                sessionID = result.body.meta.session_id;
                callback(sessionID, result.body.response.users[0]);
            }
        });
    }
}