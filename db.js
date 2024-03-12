const mongoose = require("mongoose");
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo Connnected Successfully");
});

db.on("error", (err) => {
  console.log("Error To connecte mongo db: ", err);
});

db.on("disconnected", () => {
  console.log("Mongo Disconnected Successfully");
});

// Export the database connection
module.exports = db;
