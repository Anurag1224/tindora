//This the starting point of the application. It is the main core javaScript file where we are going to write all the nodejs code.
//Here we will initialize our app and here we will write our code

const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
        res.send("All data sent ");     
});

app.get("/admin/deleteUser", (req, res) => {

        res.send("Deleted a user");

});

app.get("/user", userAuth, (req, res) => {

         res.send("User data sent "); 
         
});

app.use("/getUserData", (req, res) => {
        //Logic to DB to get some data
        try{
                throw new Error("something something...");
                res.send("Data sent successfully");
        }
        catch(err){
                //console.log(err);
                res.status(500).send("There is error in the code");
        }
});

app.use("/", ( req, res, next) => {
        if(err){
                
                res.status(500).send("Something went wrong");
        }
})

app.listen(7777, () => {
    console.log("My server is sucessfully listening on port 7777...");
});