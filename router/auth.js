const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").users;
const bcrypt = require("bcrypt");
const middleware = require("../auth/middleware");

const router = new Router();

// Get the email and password\
// Check if you have a user in your database with that email
// Check if the password is equal to the one you get in the request
// Then generate a token and sent it back

// router.post("/login", async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400).send("Please supply a valid email and password");
//   } else {
//     res.send({
//       jwt: toJWT({ userId: 1 }),
//     });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    // 1. find user based on email address

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    // 2. use bcrypt.compareSync to check the received password against the stored hash
    else if (bcrypt.compareSync(password, user.password)) {
      // 3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: user.id });
      res.send({
        jwt,
      });
    } else {
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
  }
});

//using middleware
router.get("/test-auth", middleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

//another way
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400).send("Please provide a email and password");
//   } else {
//     const auth_owner = await owner.findOne({
//       where: { email: email },
//     });
//     if (!auth_owner) {
//       res.status(400).send("User not found");
//     } else {
//       // if (password === auth_owner.password) {
//       if (bcrypt.compareSync(password, auth_owner.password)) {
//         const token = toJWT({
//           ownerId: auth_owner.id,
//         });
//         res.send({ token });
//       } else {
//         res.send("Password not correct");
//       }
//     }
//   }
// });

module.exports = router;
