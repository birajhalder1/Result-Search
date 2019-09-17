const express = require("express");
const router = express.Router();
const passport = require("passport");

const hStudent = require("../../models/HigherSecondary");

//Load input validation
const validateRegisterInput = require("../../validation/register");

// @route   GET api/student/test
// @desc    Tests student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Admin Works" }));

// @route   POST api/student/hStudentInfo
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/hStudentInfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      board: req.body.board,
      institution: req.body.institution,
      result: req.body.result
    };
    const newStudent = new hStudent(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   GET api/student/:roll
// @desc    Tests student route
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    hStudent.findOne({ name }).then(result => res.json(result));
  }
);

// @route   GET admin/hs/getAll
// @desc    All student route
// @access  Private
router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    hStudent.find().then(results => res.json(results));
  }
);

// @route   GET api/hstudent/update
// @desc    All student update route
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const student = {
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      board: req.body.board,
      institution: req.body.institution,
      result: req.body.result
    };
    hStudent
      .findOneAndUpdate({ _id: id }, { $set: student }, { new: true })
      .then(hStudent => res.json(hStudent));
  }
);

// @route   GET api/hstudent/delete
// @desc    All student delete route
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    hStudent
      .deleteOne({ _id: id })
      .then(hStudent => res.json({ msg: "deleted successfully" }));
  }
);

// @route   POST api/hStudent/validData
// @desc    hStudent validData route
// @access  Private
router.post("/validData", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const student = {
    name: req.body.name,
    rollNumber: req.body.rollNumber,
    board: req.body.board,
    institution: req.body.institution,
    result: req.body.result
  };
  const newStudent = new hStudent(student);
  newStudent.save().then(result => res.json("Student information are saved"));
});

module.exports = router;
