const router = require("express").Router();
const Plan = require("../models/plan");
const Event = require("../models/event");
const verify = require("./verifyToken");
const mongoose = require("mongoose");
const task = require("../models/task");

router.get("/plans", verify, async (req, res) => {
  const user_id = req.user._id;
  const response = await Plan.find({
    userID: user_id,
  });
  res.json(response);
});

router.post("/events", verify, async (req, res) => {
  const user_id = req.user._id;
  const date = req.body.date;
  const response = await Event.find({
    userID: user_id,
    date: date,
  });
  res.json(response);
});
router.post("/events/delete", verify, async (req, res) => {
  const user_id = req.user._id;
  const id = mongoose.Types.ObjectId(req.body.id);
  await Event.deleteOne({ userID: user_id, _id: id });
  res.send("sucessfully deleted");
});
router.post("/events/add", verify, async (req, res) => {
  console.log(req.body);
  const event = new Event({
    eventTitle: req.body.title,
    date: req.body.date,
    eventImportance: req.body.eventImportance,
    userId: req.user._id,
  });
  try {
    await Event.insertMany([event]).then(() => {
      res.send("success");
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/plans/add", verify, async (req, res) => {
  const plan = new Plan({
    plan: req.body.plan,
    userID: req.user._id,
  });
  try {
    await Plan.insertMany([plan]).then(() => {
      res.send("success");
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/plans/update", verify, async (req, res) => {
  const newValue = req.body.newvalue;
  const user_id = req.user._id;
  const id = mongoose.Types.ObjectId(req.body.id);

  await Plan.findOneAndUpdate(
    { userId: user_id, _id: id },
    { completed: newValue, completedDate: new Date() }
  );
  res.send("successfully updated");
});

router.post("/plans/delete", verify, async (req, res) => {
  const user_id = req.user._id;
  const id = mongoose.Types.ObjectId(req.body.id);
  await Plan.deleteOne({ userID: user_id, _id: id });
  res.send("sucessfully deleted");
});
module.exports = router;
