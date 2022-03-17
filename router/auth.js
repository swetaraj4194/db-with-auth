const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");

const router = new Router();

// Get the email and password\
// Check if you have a user in your database with that email
// Check if the password is equal to the one you get in the request
// Then generate a token and sent it back

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please supply a valid email and password");
  } else {
    res.send({
      jwt: toJWT({ userId: 1 }),
    });
  }
});



module.exports = router;
