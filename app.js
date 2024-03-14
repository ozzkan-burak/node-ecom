const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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

// routes
app.get("/", (req, res) => {
  res.send("Selam Burak");
});

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  connectDB();

  console.log(`Server run on ${Port}`);
});
