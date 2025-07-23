//This the starting point of the application. It is the main core javaScript file where we are going to write all the nodejs code.
//Here we will initialize our app and here we will write our code

const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//creating a POST api to write data into the database   
app.post("/signUp", async (req, res) => {

    //creating new instace i.e document of the User model
    const user = new User({
        firstName:"Sachin",
        lastName:"Tendulkar",
        emailId: "sachin@tendulkar.com",
        password: "sachin@123",
    
    });

    try {
        await user.save();

         res.send("User added successfully ");
    }
    catch (err) {
        res.status(400).send("Error saving the User : " + err.message);
    }

});

connectDB().then(() =>{
    
    console.log("Database connection established.....");

    app.listen(7777, () => {
    console.log("My server is sucessfully listening on port 7777...");
});

}).catch(err => {

    console.error("Database can not be connected !!");

});

