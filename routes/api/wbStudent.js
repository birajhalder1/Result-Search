const express = require("express");
const router = express.Router();

const wStudent = require("../../models/Wbscte");

// @route   GET api/student/test
// @desc    Tests student route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));


// @route   GET api/student/:roll
// @desc    Search roll number of student route
// @access  Public
router.get("/:rollNumber", (req, res) => {
  let rollNumber = req.params.rollNumber;
  wStudent.findOne({ rollNumber }).then(result => res.json(result));
});

module.exports = router;
