const express = require("express");
const router = express.Router();

const { handleUserSignup } = require("../controllers/user");

// show signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// handle signup form submit
router.post("/signup", handleUserSignup);

module.exports = router;
