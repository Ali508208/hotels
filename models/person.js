const mongoose = require("mongoose");

// Define Person Schema

const personSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// create Person Model

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
