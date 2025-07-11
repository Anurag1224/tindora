//This the starting point of the application. It is the main core javaScript file where we are going to write all the nodejs code.
//Here we will initialize our app and here we will write our code

const express = require('express');

const app = express();

app.use("/",(req,res) => {
    res.send("Namaste from the dashboard");
});


app.use("/test",(req,res) => {
    res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
    res.send("Hello Hello Hello");
});

app.listen(7777, () => {
    console.log("My server is sucessfully listening on port 7777...");
});