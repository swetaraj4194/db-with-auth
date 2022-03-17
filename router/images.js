const { Router, response } = require("express");
const Images = require("../models").images;
const router = new Router();



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



module.exports = router;
