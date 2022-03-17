const { Router, response } = require("express");
const Users = require("../models").users;
const router = new Router();

router.post("/", async (req, res, next) => {
  try {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      res.status(404).send("please enter all data");
    } else {
      const newUser = await Users.create({
        fname,
        lname,
        email,
        password,
      });
      res.send(newUser);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});



module.exports = router;
