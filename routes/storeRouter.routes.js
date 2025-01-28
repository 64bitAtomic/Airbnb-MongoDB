const express = require("express"); // Exdternal Module
const storeRouter = express.Router(); // External Module
const storeController = require("../controllers/store.controller"); // Local Module

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/booking", storeController.getBooking);
storeRouter.get("/favourite", storeController.getFavouriteList);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/homes/:homeId", storeController.getHomesDetails);
storeRouter.post("/favourites", storeController.postToAddFavourite);
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postRemoveFromFavourite
);
module.exports = storeRouter;
