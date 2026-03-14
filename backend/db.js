const { MongoClient } = require("mongodb");

let client;
let db;

function getMongoUri() {
  return process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bizcare";
}

function getDbNameFromUri(uri) {
  try {
    const u = new URL(uri);
    const name = (u.pathname || "").replace(/^\//, "");
    return name || "bizcare";
  } catch {
    return "bizcare";
  }
}

async function connectToMongo() {
  if (db) return { client, db };

  const uri = getMongoUri();
  client = new MongoClient(uri, {
    // Keep defaults; allow overriding via env.
  });

  await client.connect();
  const dbName = getDbNameFromUri(uri);
  db = client.db(dbName);

  return { client, db };
}

function getDb() {
  if (!db) {
    throw new Error("MongoDB not connected. Call connectToMongo() first.");
  }
  return db;
}

async function closeMongo() {
  if (client) {
    await client.close();
  }
  client = undefined;
  db = undefined;
}

module.exports = {
  connectToMongo,
  getDb,
  closeMongo,
  getMongoUri,
};
