const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURL)


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
