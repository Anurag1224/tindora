const mongoose = require("mongoose");

const connectDB = async () =>{

    await mongoose.connect("mongodb+srv://anurag1224kumar:8SaR5im1U7mDPP6I@backend.ipeafqb.mongodb.net/tindora");

};

module.exports = connectDB ;

