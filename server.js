const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Welcome To over hotel");
});

// Import the routes files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// use the routers
app.use("/person", personRoutes);
app.use("/Menu", menuRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
