// Require package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// dotenv configuration
require("dotenv").config();

// Require student route
const mstudent = require("./routes/api/mStudent");
const hstudent = require("./routes/api/hStudent");
const wbstudent = require("./routes/api/wbStudent");
const user = require("./routes/api/user");
const post = require("./routes/api/post");

// Require admin route
const ms = require("./routes/admin/ms");
const hs = require("./routes/admin/hs");
const wbs = require("./routes/admin/wbs");

const app = express();

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config DB
const db = require("./config/keys").mongoURI;

// Connect mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB are connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Middleware Use student Routes
app.use("/api/mStudent", mstudent);
app.use("/api/hStudent", hstudent);
app.use("/api/wbStudent", wbstudent);
app.use("/api/user", user);
app.use("/api/post", post);

// Middleware Use admin Routes
app.use("/admin/ms", ms);
app.use("/admin/hs", hs);
app.use("/admin/wbs", wbs);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is running port no ${port}`));
