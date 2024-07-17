const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
  name: { 
    type: String, 
    required: true
 },
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['admin', 'manager', 'member'], 
    default: 'member' 
},
  isActive: { 
    type: Boolean, 
    default: true 
}
},{
    versionKey:false
});

const UserModel = mongoose.model('User', userSchema);
module.exports = {
    UserModel
}
