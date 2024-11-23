import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/admin/login", adminLogin);
// userRouter.get("/admin/login", (req, res) => {
//   res.send("Admin login GET endpoint for testing");
// });

userRouter.post("/login", loginUser);

export default userRouter;
