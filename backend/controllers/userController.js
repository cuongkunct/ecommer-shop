import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
//import JWT
import jwt from "jsonwebtoken";

//Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: `User doesn't existed` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ status: true, token });
    } else {
      res.json({ status: false, message: "Invalid Credential" });
    }
  } catch (error) {
    return res.json({ status: false, message: error });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(email);
    //check the user already exist or not
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.json({ status: false, message: `The email ${email} existed` });
    }
    // validating email format and strong pass
    if (!validator.isEmail(email)) {
      return res.json({ status: false, message: `Please enter a valid email` });
    }
    if (password.length < 8) {
      return res.json({
        status: false,
        message: `Please enter a strong password`,
      });
    }

    // hashing user password
    //bcrypt là thư viện dùng để mã hóa mật khẩu.
    //Salt là một chuỗi ngẫu nhiên thêm vào mật khẩu trước khi hash
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    //Save object to DB
    const user = await newUser.save();
    // Create token
    const token = createToken(user._id);

    return res.json({ status: true, token, user });
  } catch (error) {
    return res.json({ status: false, message: error });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      //Tạo token login
      const token = createToken(email + password, process.env.JWT_SECRET);
      return res.json({ status: "success", token });
    } else {
      return res.json({ status: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.json({ status: false, message: error });
  }
};

export { loginUser, registerUser, adminLogin };
