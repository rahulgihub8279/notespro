const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "rahul123";

//* ROUTE 1 : create a user using POST "/api/auth/createuser" no login required

router.post(
  "/createuser",
  [
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("email", "enter a valid email").isEmail(),
  ],
  async (req, res) => {
    //* if ther are errors, return bad request and bad errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //* check weather user exist already
      let existuser = await User.findOne({ email: req.body.email });
      if (existuser) {
        alert("email already exist !");
        return res
          .status(400)
          .json({success, error: "Sorry, a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      //* create a user
      const user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authtoken:jwtData });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//* ROUTE 2 : authenticate a user :POST "/api/auth/login" : no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //* if error occured
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        }, 
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//* ROUTE 3 : get the user details "/api/auth/getuser" login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
