var mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema({
    username:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true,
    },
    profileImageUrl:{
      type:String
    },
    email:{
      type:String,
      require:true,
      unique:true
    },
    logs:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Log'
        }
    ]
})

userSchema.pre('save', async function(next){
  try{
    if(!this.isModified('password')){
      return next()
    }
    let hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
    return next()
  }catch(err){
    return next(err)
  }
})
userSchema.methods.comparePassword = async function(candidatePassword, next){
  try{
    let isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }catch(err){
    return next(err)
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User