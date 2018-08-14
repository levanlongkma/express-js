var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');
var quotationSchema  = new mongoose.Schema({
    text : String,
    author : String , 
    type : String
});
quotationSchema.plugin(timestamps)
var Quotation = mongoose.model('Quotation',quotationSchema);
module.exports = Quotation;