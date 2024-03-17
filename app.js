const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// routes import
const userRoutes = require("./routes/user");
// app
const app = express();

// db
const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    // console.log((await connection).connection.host);
    console.log("DB connected!");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

// midllewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
// routes middleware
app.use("/api", userRoutes);

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  connectDB();

  console.log(`Server run on ${Port}`);
});
