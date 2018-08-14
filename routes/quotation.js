var Quotation = require('../models/quotation');
var Type = require('../models/type');
var body = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var Type = require('../models/type');

module.exports = function(app,passport){

    //bảng danh ngôn
    app.get('/admin/table-quotation', isLoggedIn, function(req,res){
        Quotation.find()
	    .then(function(doc){	
            res.render('admin/table-quotation',{
                user : req.user,
                message: req.flash('create-quotation'),
                data : doc
            });
          
        });
    });

    //form tạo danh ngôn
    app.get('/admin/form-create-quotation',isLoggedIn,function(req,res){
        Type.find()
	    .then(function(doc){
            res.render('admin/form-create-quotation',{
                user : req.user,
                types : doc
            })
        });
    });

    //tạo mới danh ngôn
    app.post('/admin/create-quotation',isLoggedIn,function(req,res){
        var item = {
            text : req.body.text,
            type : req.body.type,
            author : req.body.author
        }
        Quotation.create(item)
        .then(task => {
            res.send(200, task)
            next()
        })
        .catch(err => {
            res.send(500, err)
        })
        req.flash('create-quotation', 'Tạo mới thành công !');
        res.redirect('/admin/table-quotation');
    })

    //xóa danh ngôn
    app.delete('/admin/delete-quotation',function(req,res){
        Quotation.collection.remove({'_id': ObjectId(""+req.body.id+"")});
        res.send(req.body.id);
    });

    //chỉnh sửa danh ngôn
    //tránh bất đồng bộ
    app.get('/admin/form-edit-quotation/:id',isLoggedIn,async function(req,res){
        
        try{
            var data = await Quotation.findOne({'_id': ObjectId("" + req.params.id + "")});
            var types = await Type.find();
            
            res.render('admin/form-edit-quotation',{
                user : req.user,
                data : data,
                types : types
            });
        } catch(e) {
            throw e;
        }
        
    });

    app.post('/admin/edit-quotation',isLoggedIn,function(req,res){
        Quotation.findByIdAndUpdate({'_id': ObjectId("" + req.body.id + "")}, { $set: { 
            type: req.body.type,
            author : req.body.author,
            text : req.body.text      
        }}, { new: true }, function (err, quotation) {
            if (err) return handleError(err);
        });   
        res.redirect('/admin/table-quotation');
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
    res.redirect('/login');
};