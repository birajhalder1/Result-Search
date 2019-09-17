const express = require("express");
const router = express.Router();
const passport = require('passport');

const wStudent = require("../../models/Wbscte");

// @route   GET api/student/test
// @desc    Tests student route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));

// @route   POST api/student/wStudentInfo
// @desc    wStudentinfo route
// @access  Public
router.post("/wbStudentInfo", passport.authenticate('jwt', { session: false }), (req, res) => {
  /*const student = {
    name: "BIRAJ HALDER",
    rollNumber: "D1240125",
    board: "Calcutta University",
    institution: "Mathurapur High School",
    result: "Pass"
  };*/
  const student = {
    name: req.body.name,
    rollNumber: req.body.rollNumber,
    board: req.body.board,
    institution: req.body.institution,
    result: req.body.result
  };
  const newStudent = new wStudent(student);
  newStudent.save().then(result => res.json("Student information are saved"));
});

// @route   GET api/student/:roll
// @desc    Tests student route
// @access  Public
router.get("/:name", (req, res) => {
  let name = req.params.name;
  wStudent.findOne({ name })
  .then(result => res.json(result));
});
// @route   GET api/wbstudent/all 
// @desc    All student route
// @access  Public
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  wStudent.find().then(results => res.json(results));
});

// @route   GET api/wbstudent/update
// @desc    All student update route 
// @access  Public
router.post("/update/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  let id = req.params.id;
  const student = {
    name: req.body.name,
    rollNumber: req.body.rollNumber,
    board: req.body.board,
    institution: req.body.institution,
    result: req.body.result
  };
  wStudent.findOneAndUpdate(
    {_id: id},
    {$set: student},
    {new: true}
  ).then(wStudent => res.json(wStudent));
});

// @route   GET api/mstudent/update
// @desc    All student update route 
// @access  Public
router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  let id = req.params.id;
  wStudent.deleteOne(
    {_id: id}
    ).then(wStudent => res.json({msg: "deleted successfully"}));
});

module.exports = router;
