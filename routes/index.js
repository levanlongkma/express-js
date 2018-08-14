var exprees = require('express');
var router = exprees.Router();

router.get('/login',function(req,res){
    res.render('login',{message: req.flash('loginMessage')});
});

module.exports = router;