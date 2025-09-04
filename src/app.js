
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
require('dotenv').config();
require("./utils/cronJob");
const http = require("http");
const initializeSocket = require("./utils/socket");

app.use(cors({
  origin : "http://localhost:5173", 
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request"); 
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established.....");

    server.listen(process.env.PORT, () => {
      console.log("My server is sucessfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected !!");
  });
