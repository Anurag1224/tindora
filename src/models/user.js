const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "geographyandyou.com/images/user-profile.png"
    },
    about: {
        type: String,
        default: "This is a default user "
    },
    skills: {
        type: [String],
    },
},{
    timestamps: true,
});

// const User = mongoose.model("User", userSchema);

// or we can directly export this model

module.exports = mongoose.model("User", userSchema);
