const express = require("express");
const router = express.Router();

const mStudent = require("../../models/Madhyamik");

// @route   GET api/mStudent/test
// @desc    Tests student route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));

// @route   GET api/mStudent/getMstudent/:rollNumber
// @desc    Search roll number of student route
// @access  Public
router.get("/getMstudent/:rollNumber", (req, res) => {
  let rollNumber = req.params.rollNumber;
  mStudent.findOne({ rollNumber }).then(result => res.json(result));
});

// @route   GET api/mStudent/getMstudent/mName/:name
// @desc    Search name of student route
// @access  Public
router.get("/getMstudent/mName/:name", (req, res) => {
  let name = req.params.name;
  mStudent.findOne({ name }).then(result => res.json(result));
});

module.exports = router;
