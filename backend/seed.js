const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sample = require("./sample-data");
const { connectToMongo, closeMongo, getMongoUri } = require("./db");

async function ensureIndexes(db) {
  await db.collection("shops").createIndex({ location: "2dsphere" });
}

function toGeoPoint(lat, lng) {
  return { type: "Point", coordinates: [lng, lat] };
}

async function seedDatasets(db) {
  const datasets = db.collection("datasets");

  const docs = [
    { _id: "meta", data: sample.meta },
    { _id: "dashboard", data: sample.dashboard },
    { _id: "appointments", data: sample.appointments },
    { _id: "transactions", data: sample.transactions },
    { _id: "inventory", data: sample.inventory },
    { _id: "billing", data: sample.billing },
    { _id: "customers", data: sample.customers },
    { _id: "feedback", data: sample.feedback },
    { _id: "prescriptions", data: sample.prescriptions },
    { _id: "notifications", data: sample.notifications },
    { _id: "analytics", data: sample.analytics },
    { _id: "subscription", data: sample.subscription },
    { _id: "admin", data: sample.admin },
  ];

  for (const d of docs) {
    await datasets.updateOne(
      { _id: d._id },
      { $setOnInsert: { data: d.data, createdAt: new Date() } },
      { upsert: true }
    );
  }
}

async function seedShops(db) {
  const shopsCol = db.collection("shops");
  const existing = await shopsCol.countDocuments();
  if (existing > 0) return;

  const shops = (sample.shops || []).map((s) => ({
    _id: s.id,
    name: s.name,
    type: s.type || "Shop",
    address: s.address,
    lat: s.lat,
    lng: s.lng,
    location: toGeoPoint(s.lat, s.lng),
    createdAt: new Date(),
  }));

  if (shops.length) {
    await shopsCol.insertMany(shops);
  }
}

async function main() {
  const uri = getMongoUri();
  // eslint-disable-next-line no-console
  console.log(`Seeding MongoDB: ${uri}`);

  const { db } = await connectToMongo();
  await ensureIndexes(db);
  await seedDatasets(db);
  await seedShops(db);

  // eslint-disable-next-line no-console
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeMongo();
  });
