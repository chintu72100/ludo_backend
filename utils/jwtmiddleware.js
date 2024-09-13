const jwt = require("jsonwebtoken");
const {jwtDecode} = require("jwt-decode");
require('dotenv').config()
const { User } = require('../model/user.model');

const createJwtToken = (payload) => {
  try {
    console.log(payload,"payload");
    const token = jwt.sign({payload}, "1234", {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

const verifyJwtToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["access-token"];
    if (!token) {
      res
        .status(400)
        .json({ status: "error", message: "Enter token to proceed" });
      return;
    }
    decoded = jwt.verify(token, "1234");
    const decodedData = jwtDecode(token);
    const user = await User.findOne({  userName: decodedData.payload } );
    if (!user) {
      res.status(400).json({ status: "error", message: "User not found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) { 
    console.log(error);
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ status: "error", message: "Token is Expired" });
    } else {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
};

module.exports = { createJwtToken, verifyJwtToken };