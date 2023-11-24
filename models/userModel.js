const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  email: String,
  rabbits: [{type: Schema.Types.ObjectId, ref:'Rabbit'}]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
