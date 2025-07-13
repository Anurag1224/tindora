//This the starting point of the application. It is the main core javaScript file where we are going to write all the nodejs code.
//Here we will initialize our app and here we will write our code

const express = require('express');

const app = express();

app.use("/test",(req,res) => {
    res.send("Hello from the server");
});



app.get("/user", (req, res) => {
    res.send({firstName:"Anurag", lastName:"Kumar"});
});

app.post("/user", (req, res) => {
    //console.log("Saved data to the database");
    res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
    //console.log("data deleted from the database");
    res.send("Data successfully deleted from the database");
});

app.use("/user",(req,res) => {
    res.send("HAHAHAHAHA");
});

// app.use("/",(req,res) => {
//     res.send("Namaste from the dashboard");
// });

app.listen(7777, () => {
    console.log("My server is sucessfully listening on port 7777...");
});