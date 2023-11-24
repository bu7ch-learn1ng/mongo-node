const { mongoose, Schema } = require("mongoose");

const rabbitSchema = new Schema({
  name: String,
  type: String,
  power: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Rabbit = mongoose.model("Rabbit", rabbitSchema);

module.exports = Rabbit;
