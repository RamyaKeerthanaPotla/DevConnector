const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//getting user model into tthis module
const Profile = require("../../src/models/Profile");
const User = require("../../src/models/User");

//@route  GET api/profile/me
//@desc   Test route
//@access Public
router.get("/me", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
