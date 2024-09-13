const express = require("express");
const { createJwtToken, verifyJwtToken } = require("../utils/jwtmiddleware");
const { User } = require("../model/user.model");

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter your email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter your password" });
  }
  const UserMailExists = await User.findOne({ email: email });

  if (UserMailExists) {
    return res.status(400).json({ message: "User Mail already exists" });
  }

  await User.create({
    email: email,
    password: password,
  });
  res.status(200).json({ status: "success", message: "User Created" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: "Please enter user data" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please enter your email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter your password" });
  }

  const user = await User.findOne({ email: email });
  console.log(user);
  
  if (!user) {
    return res.status(400).json({ message: "User Doesn't exists" });
  }
  if (user.password != password) {
    return res
      .status(400)
      .json({ message: "Username or Password is incorrect" });
  }
  res
    .status(200)
    .json({
      status: "success",
      message: "User Logged In",
      data: { email: user.email, highScore: user.highScore },
    });
};

module.exports = { signup, loginUser };
