// Load required packages
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var timestamps = require('mongoose-timestamp');

// Define our beer schema
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: String,
  address: String
});
userSchema.plugin(timestamps)
// Các phương thức ======================
// Tạo mã hóa mật khẩu
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// kiểm tra mật khẩu có trùng khớp
userSchema.methods.validPassword = function(password,hash) {
  return bcrypt.compareSync(password,this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User; // gói file trong biến User