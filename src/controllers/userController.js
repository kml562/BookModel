import validator from "validator";
import {
  isValidEmail,
  isValidPassword,
} from "../utils/validatior/validatior.js";
import UserModel from "../model/userModel.js";
export const createUser = async (req, res) => {
  try {
    let { title, name, phone, email, password, address } = req.body;
    //if requrid field is empty-----------------------------------------------------------------
    if (!title || !name || !phone || !email || !password || !address) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid parameters" });
    }
    // title check--------------------------------------------------------------------------------
    if (title !== "Mr" || !title !== "Mrs" || title !== "Miss") {
      return res.status(400).json({ status: false, message: "Invalid title" });
    }
    // email validator--------------------------------------------------------------------------------
    if (!validator.isEmail(email) || !isValidEmail(email)) {
      res.status(400).json({ status: false, message: "Invalid email" });
    }
    //password validator--------------------------------------------------------------------------------
    if (isValidPassword(password)) {
      res.status(400).json({ status: false, message: "Invalid password" });
    }
    //phone number validator--------------------------------------------------------------------------------
    if (!validator.isMobilePhone(phone)) {
      res.status(400).json({ status: false, message: "Invalid mobile number" });
    }

    const checkdata = UserModel.findOne({ $or: [{ email: email }, { phone: phone }], });
    if (checkdata) {
  return res.status(400).json({status: false, message:"user already exists"})
    }
    const data = UserModel.create(req.body);
    return res.status(201).json({
      status: true, message:data})

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
