const Home = require("../models/home.model");

exports.getAddHome = (req, res, next) => {
  res.render("../host/edit-home", {
    pageTitle: "airbnb - Add Home",
    editing: false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home Not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("../host/edit-home", {
      home: home,
      pageTitle: "airbnb - Edit Home",
      editing: editing,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((homes) => {
    res.render("../host/host-home-list", {
      homes: homes,
      pageTitle: "Host Home List",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, address, rating, photo, description } = req.body;
  const home = new Home(houseName, price, address, rating, photo, description);
  home.save().then(() => {
    console.log("home saved sucessfully.");
  });

  res.redirect("../host/host-home-list");
  // res.render("../host/add-home", { pageTitle: "airbnb - Add Home" });
};
exports.postEditHome = (req, res, next) => {
  console.log("Home Registered successfully: ", req.body);
  const { id, houseName, price, address, rating, photo, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    address,
    rating,
    photo,
    description,
    id
  );

  home.updateById().then((res) => console.log(res));
  res.redirect("../host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete: ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleteing ", error);
    });
};
