const express = require("express");
const routes = express.Router();
const Menu = require("./../models/menus");

// Save Menu data
routes.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newmenu = new Menu(data);

    const response = await newmenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch All Record

routes.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch data based on taste

routes.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await Menu.find({ taste: tasteType });
      console.log("Data Fetched Successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Menu data
routes.put("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;
    const updateMenudata = req.body;

    const response = await Menu.findByIdAndUpdate(
      MenuId,
      updateMenudata,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("Data Updated Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Menu record
routes.delete("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;

    const response = await Menu.findByIdAndDelete(MenuId);
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("Data Delete Successfully");
    res.status(200).json({message: 'Menu Delete Successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = routes;
