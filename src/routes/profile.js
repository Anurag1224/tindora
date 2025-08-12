const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();
profileRouter.use(express.json());

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("User Profile" + user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit" , userAuth,  async (req, res) => {

    try{
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key) => {

            loggedInUser[key] = req.body[key];

        });
        console.log(loggedInUser);
        res.json(  {message: loggedInUser.firstName + ", your profile updated successful", data : loggedInUser});
    }
    catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }

});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try{
      const user = req.user;
      const oldPasswordHash = user.password;
      const oldPassword = req.body.oldPassword;
      const isOldPasswordValid = await bcrypt.compare(oldPassword, oldPasswordHash);

      if(!isOldPasswordValid) {
          throw new Error("Invalid Credentials !");
      }
    
        const newPassword = req.body.newPassword;
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        user.password = newPasswordHash;

        await user.save();

        res.send(user.firstName + ", your credential is updated.")

      
    }
    catch(err) {
      res.status(400).send("ERROR : " + err.message );
    }
});


module.exports = profileRouter;