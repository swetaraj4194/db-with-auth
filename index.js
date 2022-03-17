const express = require("express");
const userRouter = require("./router/users");
const imageRouter = require("./router/images");

const app = express();
PORT = process.env.PORT || 4000;

const jsonParser = express.json();

app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => console.log(`listning on ${PORT}`));