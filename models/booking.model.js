const fs = require("fs");
const rootDir = require("../utils/pathUtils");
const path = require("path");
const BookingsDataPath = path.join(rootDir, "data", "Booking.json");
module.exports = class Bookings {
  constructor(houseName, price, address, rating, photo) {
    this.houseName = houseName;
    this.price = price;
    this.rating = rating;
    this.address = address;
    this.photo = photo;
  }
  save(homeId, callback) {
    Bookings.getBookings;
  }

  static getBookings(callback) {
    fs.readFile(BookingsDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
