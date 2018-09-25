var mongoose = require("mongoose");
const Log = require("./log");

var movementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    reps: [
      {
        type: Number,
        required: true
      }
    ],
    weight: [
      {
        type: Number,
        required: true
      }
    ],
    log: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log"
    }
  },
  {
    timestamps: true
  }
);

movementSchema.pre("remove", async function(next) {
  try {
    let log = await Log.findById(this.log);
    console.log(log);
    log.movements.remove(this.id);
    await log.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Movement = mongoose.model("Movement", movementSchema);
module.exports = Movement;
