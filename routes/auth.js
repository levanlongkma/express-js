module.exports = function(app,passport){
    app.post('/login', passport.authenticate('login',{
        successRedirect : '/admin/home',
        failureRedirect : '/login',
        failureFlash : true
    }));
    app.get('/register', function(req, res){
        res.json({message: req.flash('registerMessage')});
    });
    app.post('/register', passport.authenticate('register',{
        successRedirect : '/admin/home',
        failureRedirect : '/register',
        failureFlash : true
    }));
    app.get('/admin/home', isLoggedIn, function(req,res){
        res.render('admin/home',{user : req.user});
    });
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/login');
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
    res.redirect('/login');
};