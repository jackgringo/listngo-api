var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./user');

passport.use(new FacebookStrategy({
    clientID: '312556335535606',
    clientSecret: '87520a4925e77dae881db97f9dc99a9d',
    callbackURL: "http://localhost:3000/api/login/success"
},
function(accessToken, refreshToken, profile, done) {

    User.db.findOneQ({ oauthID: profile.id }).then(function(err, user) {
        if(err) { console.log(err); }
        if (!err && user != null) {
            done(null, user);
        } else {
            User.create({
                oauthID: profile.id,
                name: profile.displayName,
                created: Date.now()
            }).then(function(err) {
                console.log("saving user ...");
                done(null, user);
            }).fail(function(err){
                console.log(err);
            });
        };
    }).fail(console.log);
}));

module.exports = {
    login: passport.authenticate('facebook'),
    success: passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
}