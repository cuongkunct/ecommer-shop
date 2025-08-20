import userModel from "../models/userModel.js";

const loginUser = async (req, res) => {};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return req.json({ status: false, message: `The email ${email} existed` });
    }
    const newUser = await userModel.insertOne({
      name: name,
      email: email,
      password: password,
    });
    return res.json({ status: true, newUser });
  } catch (error) {
    return res.json({ status: false, message: error });
  }
};

const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
