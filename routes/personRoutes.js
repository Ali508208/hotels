const express = require("express");
const routes = express.Router();
const Person = require("./../models/person");

// Post route to add  a person
routes.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get data according to worktype
routes.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "waiter" || worktype == "manager") {
      const response = await Person.find({ work: worktype });
      console.log("Data Fetched Successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update Record
routes.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersondata = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersondata,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Updated Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Person Details

routes.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data Delete Successfully");
    res.status(200).json({message: 'person Delete Successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch All Data

routes.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = routes;
