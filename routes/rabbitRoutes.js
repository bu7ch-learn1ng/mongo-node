const Rabbit = require("../models/rabbitModel");
const User = require("../models/userModel");

const rabbitRouter = require("express").Router();

rabbitRouter.get("/all", async (req, res) => {
  try {
    const rabbits = await Rabbit.find().populate("owner", "username email");
    res.send(rabbits);
  } catch (error) {
    console.error(error);
  }
});

rabbitRouter.post("/new", async (req, res) => {
  const { name, type, power, ownerId } = req.body;
  try {
    const owner = await User.findOne({ _id: ownerId });
    if (!owner) {
      return res.send({ message: "User not found" });
    }
    let newRabbit = new Rabbit({ name, type, power, owner });
    owner.rabbits.push(newRabbit._id);
    await owner.save();
    await newRabbit.save();
    res.send({ message: "new rabbit created", newRabbit });
  } catch (error) {
    console.error(error);
  }
});
rabbitRouter.get("/:id", async (req, res) => {
  try {
    let rabbit = await Rabbit.findOne({_id:req.params.id});
    res.send(rabbit);
  } catch (error) {
    console.error(error);
  }
});

rabbitRouter.put("/:id/edit", async (req, res) => {
  const { name, type, power, ownerId } = req.body;
  try {
    const owner = await User.findOne({ _id: ownerId });
    if (!owner) {
      return res.send({ message: "user not found" });
    }
    let rabbit = await Rabbit.findOneAndUpdate(
      { _id: req.params.id },
      { name, type, power, owner: owner._id },
      { new: true }
    );
    await user.findByIdAndUpdate(rabbit.owner, {
      $pull: { rabbits: rabbit._id },
    });
    owner.rabbit.push(rabbit._id);
    await owner.save();
    res.send({ message: "rabbit updated successfully", rabbit });
  } catch (error) {
    console.error(error);
  }
});

rabbitRouter.delete("/:id/delete", async (req, res) => {
  try {
    const rabbit = await Rabbit.findOneAndDelete({ _id: req.params.id });
    if (!rabbit) {
      return res.send({ message: "Rabbit not found" });
    }
    const ownerId = rabbit.owner;
    await User.findByIdAndUpdate(ownerId, {
      $pull: { rabbits: req.params.id },
    });
    res.send({ message: "rabbit deleted successfully" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = rabbitRouter;
