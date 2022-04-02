const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:false},
},
{
  timestamps: true,
  versionKey:false
})

userSchema.pre('save', function (next) {
  this.password = bcryptjs.hashSync(this.password, 8);
  next()      
})
  
userSchema.methods.checkPass = function (bodyPass) {
  return bcryptjs.compareSync(bodyPass.toString(), this.password)
  // console.log('asd')  
}

module.exports = mongoose.model('users', userSchema);