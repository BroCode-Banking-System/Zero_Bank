const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    minLength: 10
  },
  email: {      
    type: String,
    required: true,
    unique: true    
 },
 password: {
    type: Number,
    required: true,
    minLength: 6
},
aadhaar: {
  type: Number,
  unique: true,
  sparse: true
},
pan: {
  type: Number,
  unique: true,
  sparse: true
},
kyc: {
  type: Boolean,
  default: false
},
role: {
    type: String,
    enum: ['admin', 'customer', 'employee'],
    default: 'customer'
},
otp: {
  type: Number,
  minLength: 6,
  required: true,
  unique: true
}
});

module.exports = mongoose.model("user", userSchema);