const Favourite = require("../models/favourites.model");
const Home = require("../models/home.model");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((homes) => {
    res.render("../store/index", {
      homes: homes,
      pageTitle: "airbnb home",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((homes) => {
    res.render("../store/home-list", {
      homes: homes,
      pageTitle: "Home List",
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("../store/booking", {
    pageTitle: "airbnb booking",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((homes) => {
      console.log(favourites, homes);

      const favouritesHomes = homes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      console.log(favouritesHomes);

      res.render("../store/favourite", {
        favouritesHomes: favouritesHomes,
        pageTitle: "airbnb : Favourite List",
      });
    });
  });
};

exports.postToAddFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const favorite = new Favourite(homeId);
  favorite
    .save()
    .then((res) => {
      console.log("fav added:- ", res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      res.redirect("/favourite");
    });
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home Not Found");
      res.redirect("/homes");
    } else {
      res.render("../store/home-detail", {
        pageTitle: `home details of ${home.houseName}`,
        home: home,
      });
    }
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then((res) => {
      console.log("fav Remove:- ", res);
    })
    .catch((err) => console.log("Error removing removing: ", err))
    .finally(() => {
      res.redirect("/favourite");
    });
};
