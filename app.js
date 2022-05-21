const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated } = require("./auth");
require("./passport")(passport);

// express app
const app = express();
var port = 5000;

//db connection
const user_db = require("./model/model.user");
const stats_db = require("./model/model.stats");
const db =
  "mongodb+srv://gowtham:test1234@main.l0g6f.mongodb.net/Saviour?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

//view engine
app.set("view engine", "ejs");

//static , password  and middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "gowtham",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//auth Routes

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "dashboard",
    failureRedirect: "login",
  })(req, res, next);
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { name, age, mailid, contact, gender, location, password, password2 } =
    req.body;
  var errors = 0;
  if (password != password2) {
    console.log("Passwords do not match");
    errors = 1;
  }
  if (password.length < 6) {
    console.log("Passwords length must be greater than 6");
    errors = 1;
  }
  if (errors != 0) {
    res.redirect("register");
  } else {
    const new_user = new user_db({
      name: req.body.name,
      age: req.body.age,
      mailid: req.body.mailid,
      contact: req.body.contact,
      gender: req.body.gender,
      location: req.body.location,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(new_user.password, salt, (err, hash) => {
        if (err) throw err;
        new_user.password = hash;
        new_user
          .save()
          .then((user) => {
            res.render("login");
          })
          .catch((err) => console.log(err));
      })
    );
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("login");
});

// dashboard Route
app.get("/", (req, res) => {
  const stats = (req, res) => {
    stats_db
      .find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("dashboard", { stats: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
});

//404 Route
app.use((req, res) => {
  res.status(404).render("404");
});
