const User = require("../models/user")
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {

try{
    //Read the token
  const {token} = req.cookies;
  if(!token) {
    throw new Error("Invaid Token")
  }

  const decodedObj = await jwt.verify(token, "Anurag@123$");

  //validate the token
  const {_id} = decodedObj;

  //find the user

  const user =  await User.findById(_id);
  if(!user){
    throw new Error("User not found");
  }

  //attaching this user object to request
  req.user = user;
  next();
}
catch (err) {
  res.status(400).send("ERROR : " + err.message);
}

}

module.exports = {
  userAuth
}