const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const MONGO_URL =
  "mongodb+srv://zk286187:zk2004@completecoding.evkc0.mongodb.net/?retryWrites=true&w=majority&appName=CompleteCoding";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB:", error);
    });
};

const getdb = () => {
  if (!_db) {
    throw new Error("Database not connected.");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
