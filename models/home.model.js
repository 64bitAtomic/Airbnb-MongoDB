const { ObjectId } = require("mongodb");
const { getdb } = require("../utils/database");

module.exports = class Home {
  constructor(houseName, price, address, rating, photo, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.rating = rating;
    this.address = address;
    this.photo = photo;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }
  save() {
    const db = getdb();
    return db.collection("homes").insertOne(this);
  }
  static fetchAll() {
    const db = getdb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getdb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }
  static deleteById(homeId) {
    const db = getdb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) })
      .next();
  }
  updateById() {
    const db = getdb();
    const updateData = { ...this };
    delete updateData._id; // Avoid including _id in the update
    return db
      .collection("homes")
      .updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateData });
  }
};
