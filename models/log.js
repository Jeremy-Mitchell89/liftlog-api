var mongoose = require("mongoose");
const User = require("./user");

var logSchema = new mongoose.Schema({
  title: String,
  date: String,
  notes: String,
  movements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movement"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

logSchema.pre("remove", async function(next) {
  try {
    let user = await User.findById(this.user);
    user.logs.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
