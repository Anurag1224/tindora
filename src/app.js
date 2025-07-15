//This the starting point of the application. It is the main core javaScript file where we are going to write all the nodejs code.
//Here we will initialize our app and here we will write our code

const express = require('express');

const app = express();

app.use("/test",(req,res) => {
    res.send("Hello from the server");
});


app.get(/.*fly$/, (req, res) => {
    res.send({firstName:"Anurag", lastName:"Kumar"});
});

//Dynamic route and req.params to get the parameters 

app.get("/user/:userId/:name/:password", (req, res) => {
    
    const obj = JSON.parse(JSON.stringify(req.params)); // if we do this then the response that is returned from the req.parmas will be a JS object
    console.log(obj);
    res.send({firstName:"Anurag", lastName:"Kumar"});
});

// req.query to get the queries

// app.get("/user/:userId", (req, res) => {
//     console.log(req.query); // here it will give the out put but it says [Object: null prototype] 
//     res.send({firstName:"Anurag", lastName:"Kumar"});
// });

// app.get("/user", (req, res) => {
//     res.send({firstName:"Anurag", lastName:"Kumar"});
// });

// app.post("/user", (req, res) => {
//     //console.log("Saved data to the database");
//     res.send("Data successfully saved to the database");
// });

// app.put("/user", (req, res) => {
//     // console.log("Data updated sucessfully");
//     res.send("Data updated sucessfully");
// });

// app.patch("/user", (req, res) => {
//     //console.log("Particular data updated successfully");
//     res.send("Particular data updated successfully");
// });

// app.delete("/user", (req, res) => {
//     //console.log("data deleted from the database");
//     res.send("Data successfully deleted from the database");
// });

// app.use("/user",(req,res) => {
//     res.send("HAHAHAHAHA");
// });

// app.use("/",(req,res) => {
//     res.send("Namaste from the dashboard");
// });

//Playing more with routes i.e advanced concept

app.listen(7777, () => {
    console.log("My server is sucessfully listening on port 7777...");
});