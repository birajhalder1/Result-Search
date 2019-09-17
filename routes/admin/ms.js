const express = require("express");
const router = express.Router();
const passport = require("passport");

const mStudent = require("../../models/Madhyamik");

// @route   GET api/student/test
// @desc    Tests student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));

// @route   POST admin/ms/mStudentInfo
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/mStudentInfo",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      board: req.body.board,
      institution: req.body.institution,
      result: req.body.result
    };
    const newStudent = new mStudent(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   GET admin/ms/getSingle/:rollNumber
// @desc    Tests student route
// @access  Private
router.get(
  "/getSingle/:rollNumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let rollNumber = req.params.rollNumber;
    mStudent.findOne({ rollNumber }).then(result => res.json(result));
  }
);

// @route   GET admin/ms/get/:id
// @desc    Tests student route
// @access  Private
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    mStudent.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   GET admin/ms/getAll
// @desc    All student route
// @access  Private
router.get(
  "/getAll",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    mStudent.find().then(results => res.json(results));
  }
);

// @route   GET admin/ms/update
// @desc    All student update route
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("hittd");
    let id = req.params.id;
    const student = {
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      board: req.body.board,
      institution: req.body.institution,
      result: req.body.result
    };
    mStudent
      .findOneAndUpdate({ _id: id }, { $set: student }, { new: true })
      .then(mStudent => res.json(mStudent));
  }
);

// @route  DELETE admin/ms/delete/:id
// @desc    All student delete route
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    mStudent
      .deleteOne({ _id: id })
      .then(mStudent => res.json({ msg: "deleted successfully" }));
  }
);

module.exports = router;
