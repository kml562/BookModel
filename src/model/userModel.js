import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userScema = new Schema({
  title: {
    type: String,
    require: true,
    enum: ["Mr", "Mrs", "Miss"],
  },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (email) {
        // Regular expression to validate email format--------------------------------------------
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 15,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
}, { timestamps: true });

const UserModel = model("User", userScema);
export default UserModel;
