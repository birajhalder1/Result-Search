const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const User = require("../../models/User");
const keys = require("../../config/keys");
const passport = require("passport");

// Load validationRegisterInput
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route   GET api/user/test
// @desc    Tests student route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));

// @route   POST api/user/register
// @desc    register route
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Error validation
      return res.json({ msg: "email already exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        viewPass: req.body.password,
        mobile: req.body.mobile
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/user/login
// @desc    user login route
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.json(errors);
    //return res.json({message:`${errors.email}`, variant:'error'});
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      // valid error
      return res.json({ email: "User not found" });
    }
    // Check for Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, email: user.email }; //create JWT payload
        // Create JWTToken
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        // error validation
        return res.json({ password: "password incurrect.." });
      }
    });
  });
});

// @route   POST api/user/current
// @desc    Retrun current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
