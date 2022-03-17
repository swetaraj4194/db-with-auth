const { Router, response } = require("express");
const Images = require("../models").images;
const { toJWT, toData } = require("../auth/jwt");
const router = new Router();
const middleware = require('../auth/middleware')

// get by id
router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const url = await Images.findByPk(id);
    if (!url) {
      response.status(404).send("no images");
    } else {
      response.send(url);
    }
  } catch (e) {
    console.log(e.message);

    next(e);
  }
});


//get by post
router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(404).send("please enter all datails");
    } else {
      const newImages = await Images.create({
        title,
        url,
      });
      res.send(newImages);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});


router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Images.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

//using midware
router.get("/", middleware, async (req, res, next) => {
  try {
    const allImg = await Images.findAll();
    res.json(allImg);
  } catch (e) {
    next(e);
  }
});




module.exports = router;
