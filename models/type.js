var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var typeSchema = new mongoose.Schema({
    type : String
})

typeSchema.plugin(timestamps)
var Type = mongoose.model('Type',typeSchema);
module.exports = Type;