const express = require("express"); // External Module
const storeRouter = require("./routes/storeRouter.routes"); // Local Module
const hostRouter = require("./routes/hostRouter.routes"); // Local Module
const errorController = require("./controllers/error.controller");
const { mongoConnect } = require("./utils/database");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded()); // body parser
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(errorController.pageNotFound);

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
});
