const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, minlength: 10, maxlength: 10 },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
