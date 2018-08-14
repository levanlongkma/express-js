var mongoose = require('mongoose');
var dbconfig = require('../config/database.js');
var User = require("../models/user");

mongoose.connect(dbconfig.url); //gọi url trong file config/database\

var products = [
    new User ({
        id: 1,
        username: "lelong",
        email: "levanlongkma@gmail.com",
        password : "longkma1234",
        gender : "nam",
        address : "Hà Nội"
    }),
    new User ({
        id: 2,
        username: "lelong2",
        email: "levanlongkma2@gmail.com",
        password : "longkma1234",
        gender : "nam",
        address : "Hà Nội"
    }),
    new User ({
        id: 3,
        username: "lelong3",
        email: "levanlongkma3@gmail.com",
        password : "longkma1234",
        gender : "nam",
        address : "Hà Nội"
    })
];
var done = 0;
for(var i = 0 ; i< products.length ;i++){
    products[i].save(function(err,result){
        done++;
        if (done === products.length) {
            exit();
        }
    });
};
function exit(){
    mongosee.disconnect();
}

