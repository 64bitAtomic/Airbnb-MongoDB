const { getdb } = require("../utils/database");
module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }
  save() {
    const db = getdb();
    return db
      .collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }
  static getFavourites() {
    const db = getdb();
    return db.collection("favourites").find().toArray();
  }
  static deleteById(delhomeId) {
    const db = getdb();
    return db.collection("favourites").deleteOne({ houseId: delhomeId });
  }
};
