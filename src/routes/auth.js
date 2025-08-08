const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");



authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    //validation of user data
    validateSignUpData(req);

    // encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);

    //creating new instace i.e document of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.send("User added successfully ");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //first check whether the email id exists in the DB or not
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials !");
    }

    //if email exists then check for password whether it is correct or not
    isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT token
      const token = await user.getJWT();

      //add the token into cookie and send the response back to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      }); //cookie expires in 1 hour

      res.send("Login sucessfully !!!");
    } else {
      throw new Error("Invalid Credentials !");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });

    res.send("Logout Successfully !");
});

module.exports = authRouter;