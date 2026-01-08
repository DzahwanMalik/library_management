import express from "express";
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/user", addUser);
userRouter.get("/users", getUsers);
userRouter.patch("/user/:id_user", updateUser);
userRouter.delete("/user/:id_user", deleteUser);

export default userRouter;
