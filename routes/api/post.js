const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Post model
const Post = require("../../models/Post");

// Validation
const validatepostInput = require("../../validation/posts");

//@route GET api/post/test
//@desc Test route
//@access Public
router.get("/test", (req, res) => res.json(" Post test work"));

//@route GET api/post
//@desc Create post route
//@access Private
router.post("/",passport.authenticate("jwt", { session: false }),(req, res) => {
    const { errors, isvalid } = validatepostInput(req.body);

    //check validation
    if (!isvalid) {
      //If any error send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
