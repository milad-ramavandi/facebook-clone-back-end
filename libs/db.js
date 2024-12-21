const { MongoClient } = require("mongodb");
require("dotenv").config();

// Connection URL
const url = process.env.CONNECTION_URL;
const client = new MongoClient(url);


// Database Name
const dbName = "facebook-clone-db";

const mainDB = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to mongodb");
  const db = client.db(dbName);
  return db
}

module.exports = {mainDB}