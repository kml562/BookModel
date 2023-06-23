import validator from "validator";
import {
  isValidEmail,
  isValidPassword,
} from "../utils/validatior/validatior.js";
import UserModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
//Register user=========================================================================================
export const createUser = async (req, res) => {
  try {
    let { title, name, phone, email, password, address } = req.body;
    let Data = req.body;
    //if requrid field is empty-----------------------------------------------------------------
    if (!title || !name || !phone || !email || !password || !address) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid parameters" });
    }
    // title check--------------------------------------------------------------------------------
    // if (title !== "Mr" || title !== "Mrs" || title !== "Miss") {
    //   return res.status(400).json({ status: false, message: "Invalid title" });
    // }
    // email validator--------------------------------------------------------------------------------
    if (!validator.isEmail(email) || !isValidEmail(email)) {
     return res.status(400).json({ status: false, message: "Invalid email" });
    }
    //password validator--------------------------------------------------------------------------------
    if (!isValidPassword(password)) {
    return  res.status(400).json({ status: false, message: "Invalid password" });
    }

    //without regex validation----------------------------------------------------------------
    if (!password.trim().length < 8 || !password.trim().length > 15) { 
      return res.status(400).json({ status: false, message: "Invalid password" });
    }
    //phone number validator--------------------------------------------------------------------------------
    req.body.phone = phone + "";
    phone = phone + "";
    if (!validator.isMobilePhone(phone, 'any')) {
    return  res.status(400).json({ status: false, message: "Invalid mobile number" });
    }
    
    const checkdata = await UserModel.findOne({ $or: [{ email: email }, { phone: phone }], });
    if (checkdata) {
  return res.status(400).json({status: false, message:"user already exists"})
    }
        //hashing  the password------------------------------------------------------------------->>>>>>>>>>>>
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        Data.password = hashedPassword; // returning the hashed password;
    
    const data = await UserModel.create(Data);
    return res.status(201).json({
      status: true, data:data})

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//Login=========================================================================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {JWT_SECRET,JWT_EXPIRY}= process.env
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Please enter email address and password" })
    }
    // email validator--------------------------------------------------------------------------------
    if (!validator.isEmail(email) || !isValidEmail(email)) {
      return res.status(400).json({ status: false, message: "Invalid email" });
    }
    //password validator--------------------------------------------------------------------------------
    if (!isValidPassword(password)) {
      return res.status(400).json({ status: false, message: "Invalid password" });
    }
   //without regex validation----------------------------------------------------------------
   if (!password.trim().length < 8 || !password.trim().length > 15) { 
    return res.status(400).json({ status: false, message: "Invalid password" });
  }
    const userlogin = await UserModel.findOne({email});
    if (!userlogin) {
      return res.status(400).json({ status: false, message: "invalid email" });
    }
    // compare password--------------------------------------------------------------------------------
    bcrypt.compare(password, userlogin.password, function (err, passwordMatch) {
      if (err || !passwordMatch) {
        return res.status(400).json({ status: false, message: 'Passwords do not match' });
      }

      const token = jwt.sign({ id: userlogin._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
      });

      res.setHeader('x-api-key', token);
      return res.status(200).json({ status: true, data: { token: token } });
      
    });
     } catch (error) {
    res.status(500).json({status: false, message: error.message});
  }
}
