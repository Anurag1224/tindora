//This the starting point of the application. It is the main core javaScript file where we are going to write all the nodejs code.
//Here we will initialize our app and here we will write our code

const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//creating a POST api to write data into the database
app.post("/signUp", async (req, res) => {
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

app.post("/signin", async (req, res) => {
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

//Profile API

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("User Profile" + user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Feed API - GET /feed - to get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); //passing an empty filter
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//creating a GET api to get the user from a database based on their emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/getUser", async (req, res) => {
  const userId = req.body._id;

  try {
    console.log(userId);
    const users = await User.findById(userId);
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update data of a user using userId

// app.patch("/user", async (req, res) => {

//     const userId = req.body.userId;

//     const data = req.body;

//     try{
//         // const user = await User.findByIdAndUpdate({_id : userId}, data);
//         // OR
//          const user = await User.findByIdAndUpdate( userId , data, {returnDocument: "after"});
//          console.log(user);
//         res.send("User data updated successfully");
//     }
//     catch(err){
//         res.status(400).send("Something went wrong");
//     }

// });

//Update data of a user using user EmailId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    // const user = await User.findOneAndUpdate({_id : userId}, data);
    // OR
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User data updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});

//delete user API - delete a user data from a database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const user = await User.findByIdAndDelete({_id : userId});
    //OR
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  //sending a connection request
  console.log("Sending connection request");

  res.send(user.firstName + " has sent the connection Request");
});

connectDB()
  .then(() => {
    console.log("Database connection established.....");

    app.listen(7777, () => {
      console.log("My server is sucessfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected !!");
  });
