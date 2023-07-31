const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const express = require("express");
// const app= express();
const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  ///Register user logic

  try {
    const { name, email, contact, location, password } = req.body;
    if (!(email && name && contact && location && password)) {
      res.status(400).send("All Inputs are required");
      return;
    }

    //check if user exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .json({ message: "User already exist, Please login" });
    }
    ////EncryptUserPassword
    const encryptUserPassword = await bcryptjs.hash(password, 10);

    ////Create user in Database

    const newUser = await User.create({
      name: name,
      email: email.toLowerCase(),
      contact: contact,
      location: location,
      password: encryptUserPassword,
    });
    newUser.save();
    res.status(200).json(newUser);
    return;
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/logIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All Fields are required");
      return;
    }
    //check if user exixst
    const existingUser = await User.findOne({ email });

    if (
      existingUser &&
      (await bcryptjs.compare(password, existingUser.password))
    ) {
      return res.status(200).json(existingUser);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {}
});

module.exports = authRouter;
