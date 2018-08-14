var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //đăng kí
    passport.use('register',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },function(req,email,password,done) {
        
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, req.flash('registerMessage','Email is already taken...' ));
            } else{
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.username = req.param('username');
                newUser.gender = req.param('gender');
                newUser.address = req.param('address');
                newUser.save(function(err){
                if(err) throw err;
                    return done(null,newUser);
                });
            }
        });
    }));
    
    //đăng nhập
    passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
        function(req,email, password, done) {
            var n = email.indexOf("@vietis.com");

            if(n!=-1) {
                User.findOne({ email: email }, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, req.flash('loginMessage','Email không chính xác' ));
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false,  req.flash('loginMessage','Mật khẩu không chính xác' ));
                    }
                    return done(null, user);
                });
            } else {
                return done(null, false, req.flash('loginMessage','Email phải có dạng name@vietis.com' ));
            }
        }
    ));


};