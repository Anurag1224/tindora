const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      match: /^[a-zA-Z]+$/,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
      match: /^[a-zA-Z]+$/,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Inalid Email Address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong passwordL" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender type",
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data not valid");
      //   }

      // },
    },
    photoUrl: {
      type: [String],
      default: [
        "https://i.pinimg.com/1200x/cc/ef/70/ccef70e1f67357edd659be8d1da6813e.jpg",
      ],
      validate(value) {
        value.forEach((url) => {
          if (!validator.isURL(url)) {
            throw new Error("Invalid Photo URL: " + url);
          }
        });
      },
    },
    about: {
      type: String,
      default: "This is a default user ",
      validate: {
        validator: function (str) {
          return str.length <= 100;
        },
        message: "About should be less than 100 words",
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 10;
        },
        message: "You can add up to 10 skills only.",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: this._id }, "Anurag@123$", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

// const User = mongoose.model("User", userSchema);

// or we can directly export this model

module.exports = mongoose.model("User", userSchema);
