const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
  },

  () => console.log("Connected to db!")
);

//Import Routes
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/taskboard");
const planRoute = require("./routes/planAPI");
app.use(cors());
app.use(express.json());

//Route middleware

app.use("/api/user", authRoute);
app.use("/api", taskRoute);
app.use("/api", planRoute);
app.listen(5000, () => console.log("Server up and running"));
