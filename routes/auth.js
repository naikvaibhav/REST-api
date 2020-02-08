const express = require("express");
const router = express.Router();
//web token
const jwt = require("jsonwebtoken");

//has password library
const bcrypt = require("bcryptjs");

//validation
const { registerValidation, loginValidation } = require("../routes/validation");

//model
const User = require("../models/Auth");

// //validation
// const Joi = require("@hapi/joi");

// const schema = Joi.object({
//   name: Joi.string()
//     .min(6)
//     .required(),
//   email: Joi.string()
//     .min(6)
//     .required()
//     .email(),
//   password: Joi.string()
//     .min(6)
//     .required()
// });

//register
router.post("/register", async (req, res) => {
  //lets validate the data before we make a user
  //   const validation = schema.validate(req.body);
  //   if (validation.error)
  //     return res.status(400).send(validation.error.details[0].message);
  const validation = registerValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  //checking if the user already exists in database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //generate hashed password
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating a new user
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login

router.post("/login", async (req, res) => {
  //lets validate the data
  const validation = loginValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  //checking if the user already exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is invalid");

  //check for correct password
  const pwd = await bcrypt.compare(req.body.password, user.password);
  if (!pwd) return res.status(400).send("Password is invalid");

  try {
    //create and assign a token
    const token = jwt.sign({ _id: user._id }, "dsncksnkjnslddmbjcbsjbc");
    res.header("auth-token", token).send(token);
    res.send("Logged in!");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
