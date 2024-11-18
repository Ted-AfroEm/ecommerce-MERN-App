import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const createToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string);
};

const loginUser = async () => {};

const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

const adminLogin = async () => {};

export { loginUser, registerUser, adminLogin };
