const router = require("express").Router();
const Task = require("../models/task");
const verify = require("./verifyToken");
const mongoose = require("mongoose");
router.get("/tasks/to-do", verify, async (req, res) => {
  const user_id = req.user._id;
  const response = await Task.find({ userId: user_id, tabName: "TO-DO" });
  res.json(response);
});
router.get("/tasks/doing", verify, async (req, res) => {
  const user_id = req.user._id;
  const response = await Task.find({ userId: user_id, tabName: "DOING" });
  res.json(response);
});
router.get("/tasks/completed", verify, async (req, res) => {
  const user_id = req.user._id;
  const response = await Task.find({ userId: user_id, tabName: "COMPLETED" });
  res.json(response);
});
router.get("/tasks/work-later", verify, async (req, res) => {
  const user_id = req.user._id;
  const response = await Task.find({ userId: user_id, tabName: "WORK-LATER" });
  res.json(response);
});

router.post("/tasks/fetch", verify, async (req, res) => {
  const user_id = req.user._id;
  const date = req.body.date;
  const response = await Task.find({ userId: user_id, date: date });
  res.json(response);
});

router.post("/tasks/delete", verify, async (req, res) => {
  const user_id = req.user._id;
  const id = mongoose.Types.ObjectId(req.body.id);
  await Task.deleteOne({ userId: user_id, _id: id });
  res.send("Successfully deleted");
});

router.post("/tasks/updateTab", verify, async (req, res) => {
  const newValue = req.body.newvalue;
  const user_id = req.user._id;
  const id = mongoose.Types.ObjectId(req.body.id);
  await Task.findOneAndUpdate(
    { userId: user_id, _id: id },
    { tabName: newValue }
  );
  res.send("successfully updated");
});

router.post("/tasks/updateRecord", verify, async (req, res) => {
  const user_id = req.user._id;
  const id = mongoose.Types.ObjectId(req.body.id);
  const title = req.body.title;
  const description = req.body.description;
  const date = req.body.date;
  const tabName = req.body.tabName;
  const response = await Task.findOneAndUpdate(
    { userId: user_id, _id: id },
    { title: title, description: description, date: date, tabName: tabName }
  );
  res.send(response);
});
router.post("/tasks/add", verify, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    tabName: req.body.tabName,
    userId: req.user._id,
  });

  try {
    await Task.insertMany([task]).then(() => {
      res.send("success");
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
