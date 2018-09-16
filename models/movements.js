var mongoose = require('mongoose');

var movementSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    reps:[{
      type:Number,
      required:true
    }],
    weight:[{
      type:Number,
    	required:true
    }],
    log:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Log'
    }
},
  {
    timestamps: true
  }
);

const Movement = mongoose.model('Movement', movementSchema);
module.exports = Movement