const userRouter = require("express").Router();
const {
  allUsers,
  postUser,
  putUser,
  removeUser,
} = require("../controllers/userController");

userRouter.get("/all", allUsers);
userRouter.post("/create", postUser);
userRouter.put("/:id/edit", putUser);
userRouter.delete("/:id/delete", removeUser);

module.exports = userRouter;
