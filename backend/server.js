const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const crypto = require("crypto");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const sample = require("./sample-data");
const { connectToMongo, getDb, closeMongo } = require("./db");

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.use(
  session({
    name: "bizcare.sid",
    secret: process.env.SESSION_SECRET || "dev_only_change_me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

function getSessionUser(req) {
  const u = req.session && req.session.user;
  if (!u || !u.id || !u.role) return null;
  return u;
}

function requireAuth(req, res, next) {
  const u = getSessionUser(req);
  if (!u) return res.status(401).json({ error: "unauthorized" });
  req.user = u;
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    const u = getSessionUser(req);
    if (!u) return res.status(401).json({ error: "unauthorized" });
    if (!roles.includes(u.role)) return res.status(403).json({ error: "forbidden" });
    req.user = u;
    next();
  };
}

// Basic request logging (kept minimal).
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// Serve the single-page HTML from the workspace root.
const workspaceRoot = path.resolve(__dirname, "..");
app.get("/", (req, res) => {
  res.sendFile(path.join(workspaceRoot, "frontend", "index.html"));
});
app.get("/saas-dashboard.html", (req, res) => {
  res.sendFile(path.join(workspaceRoot, "saas-dashboard.html"));
});

// Frontend static files (CSS/JS).
app.use(express.static(path.join(workspaceRoot, "frontend")));

// Static assets support (if you add css/js/images later).
app.use("/static", express.static(workspaceRoot));

// --- API ---
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/auth/me", (req, res) => {
  const u = getSessionUser(req);
  if (!u) return res.json({ ok: false, user: null });
  return res.json({ ok: true, user: u });
});

app.post("/api/auth/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  } else {
    res.json({ ok: true });
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const username = (req.body && req.body.username) ? String(req.body.username).trim() : "";
    const password = (req.body && req.body.password) ? String(req.body.password) : "";
    const role = (req.body && req.body.role) ? String(req.body.role).trim() : "";

    if (!username || !password || !role) {
      return res.status(400).json({ error: "invalid_request", message: "username, password, role required" });
    }
    if (!(["admin", "shopkeeper", "user"].includes(role))) {
      return res.status(400).json({ error: "invalid_request", message: "invalid role" });
    }

    const db = getDb();
    const doc = await db.collection("users").findOne({ username, role });
    if (!doc) return res.status(401).json({ error: "invalid_credentials" });

    const ok = await bcrypt.compare(password, doc.passwordHash);
    if (!ok) return res.status(401).json({ error: "invalid_credentials" });

    const sessionUser = { id: doc._id, username: doc.username, role: doc.role, displayName: doc.displayName || doc.username };
    req.session.user = sessionUser;
    return res.json({ ok: true, user: sessionUser });
  } catch (e) {
    next(e);
  }
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const username = (req.body && req.body.username) ? String(req.body.username).trim() : "";
    const password = (req.body && req.body.password) ? String(req.body.password) : "";
    const role = (req.body && req.body.role) ? String(req.body.role).trim() : "user";
    const displayName = (req.body && req.body.displayName) ? String(req.body.displayName).trim() : "";

    if (!username || !password) {
      return res.status(400).json({ ok: false, error: "invalid_request", message: "username and password required" });
    }
    if (!( ["admin", "shopkeeper", "user"].includes(role) )) {
      return res.status(400).json({ ok: false, error: "invalid_request", message: "invalid role" });
    }
    if (username.length < 3 || username.length > 40) {
      return res.status(400).json({ ok: false, error: "invalid_request", message: "username must be 3-40 chars" });
    }
    if (password.length < 4 || password.length > 100) {
      return res.status(400).json({ ok: false, error: "invalid_request", message: "password must be 4-100 chars" });
    }

    const db = getDb();
    const existing = await db.collection("users").findOne({ username, role }, { projection: { _id: 1 } });
    if (existing) {
      return res.status(409).json({ ok: false, error: "already_exists", message: "user already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();
    const id = `usr_${crypto.randomUUID()}`;
    await db.collection("users").insertOne({
      _id: id,
      username,
      role,
      displayName: displayName || username,
      passwordHash,
      createdAt: now,
    });

    return res.status(201).json({ ok: true, user: { id, username, role, displayName: displayName || username } });
  } catch (e) {
    // Handle unique index race
    if (e && (e.code === 11000 || e.code === 11001)) {
      return res.status(409).json({ ok: false, error: "already_exists", message: "user already exists" });
    }
    next(e);
  }
});

function canAccess(role, method, apiPath) {
  if (apiPath === "/health") return true;
  if (apiPath.startsWith("/auth")) return true;
  if (apiPath === "/shops/nearby") return true;

  if (!role) return false;
  if (role === "admin") return true;

  if (role === "shopkeeper") {
    if (apiPath === "/products") return true;
    if (apiPath === "/orders") return method === "GET";
    if (apiPath === "/auth/logout") return true;
    if (apiPath === "/auth/me") return true;
    return false;
  }

  if (role === "user") {
    if (apiPath === "/products") return method === "GET";
    if (apiPath === "/orders") return method === "POST";
    if (apiPath === "/orders/my") return method === "GET";
    if (apiPath === "/auth/logout") return true;
    if (apiPath === "/auth/me") return true;
    return false;
  }

  return false;
}

// Auth gate for all API endpoints except health/auth/nearby
app.use("/api", (req, res, next) => {
  const u = getSessionUser(req);
  const role = u ? u.role : null;
  if (!canAccess(role, req.method, req.path)) {
    if (!u && !(req.path === "/health" || req.path.startsWith("/auth") || req.path === "/shops/nearby")) {
      return res.status(401).json({ error: "unauthorized" });
    }
    return res.status(403).json({ error: "forbidden" });
  }
  if (u) req.user = u;
  next();
});

async function getDataset(id) {
  const db = getDb();
  const doc = await db.collection("datasets").findOne({ _id: id });
  return doc ? doc.data : null;
}

app.get("/api/meta", async (req, res, next) => {
  try {
    const v = await getDataset("meta");
    res.json(v || sample.meta);
  } catch (e) {
    next(e);
  }
});

app.get("/api/dashboard", async (req, res, next) => {
  try {
    const v = await getDataset("dashboard");
    res.json(v || sample.dashboard);
  } catch (e) {
    next(e);
  }
});
app.get("/api/dashboard/weekly-revenue", async (req, res, next) => {
  try {
    const v = (await getDataset("dashboard")) || sample.dashboard;
    res.json(v.weeklyRevenue);
  } catch (e) {
    next(e);
  }
});
app.get("/api/dashboard/revenue-mix", async (req, res, next) => {
  try {
    const v = (await getDataset("dashboard")) || sample.dashboard;
    res.json(v.revenueMix);
  } catch (e) {
    next(e);
  }
});

app.get("/api/appointments/today", async (req, res, next) => {
  try {
    const v = (await getDataset("appointments")) || sample.appointments;
    res.json(v.todaySummary);
  } catch (e) {
    next(e);
  }
});
app.get("/api/clinic/queue", async (req, res, next) => {
  try {
    const v = (await getDataset("appointments")) || sample.appointments;
    res.json(v.queue);
  } catch (e) {
    next(e);
  }
});
app.get("/api/clinic/doctors", async (req, res, next) => {
  try {
    const v = (await getDataset("appointments")) || sample.appointments;
    res.json(v.doctors);
  } catch (e) {
    next(e);
  }
});

app.get("/api/transactions/recent", async (req, res, next) => {
  try {
    const v = (await getDataset("transactions")) || sample.transactions;
    res.json(v.recent);
  } catch (e) {
    next(e);
  }
});

app.get("/api/inventory", async (req, res, next) => {
  try {
    const v = await getDataset("inventory");
    res.json(v || sample.inventory);
  } catch (e) {
    next(e);
  }
});

app.get("/api/billing/summary", async (req, res, next) => {
  try {
    const v = (await getDataset("billing")) || sample.billing;
    res.json(v.summary);
  } catch (e) {
    next(e);
  }
});
app.get("/api/billing/invoices", async (req, res, next) => {
  try {
    const v = (await getDataset("billing")) || sample.billing;
    res.json(v.invoices);
  } catch (e) {
    next(e);
  }
});

app.get("/api/customers", async (req, res, next) => {
  try {
    const v = await getDataset("customers");
    res.json(v || sample.customers);
  } catch (e) {
    next(e);
  }
});

app.get("/api/feedback", async (req, res, next) => {
  try {
    const v = await getDataset("feedback");
    res.json(v || sample.feedback);
  } catch (e) {
    next(e);
  }
});

app.get("/api/prescriptions", async (req, res, next) => {
  try {
    const v = await getDataset("prescriptions");
    res.json(v || sample.prescriptions);
  } catch (e) {
    next(e);
  }
});

app.get("/api/notifications", async (req, res, next) => {
  try {
    const v = await getDataset("notifications");
    res.json(v || sample.notifications);
  } catch (e) {
    next(e);
  }
});

app.get("/api/analytics", async (req, res, next) => {
  try {
    const v = await getDataset("analytics");
    res.json(v || sample.analytics);
  } catch (e) {
    next(e);
  }
});

app.get("/api/subscription", async (req, res, next) => {
  try {
    const v = await getDataset("subscription");
    res.json(v || sample.subscription);
  } catch (e) {
    next(e);
  }
});

app.get("/api/admin", async (req, res, next) => {
  try {
    const v = await getDataset("admin");
    res.json(v || sample.admin);
  } catch (e) {
    next(e);
  }
});

// Products (Inventory)
app.get("/api/products", async (req, res, next) => {
  try {
    const db = getDb();
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 500);
    const docs = await db
      .collection("products")
      .find({}, { projection: { _id: 1, name: 1, category: 1, stockQty: 1, stockText: 1, levelPct: 1, unitPriceInr: 1, supplier: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    res.json({ count: docs.length, products: docs.map((d) => ({ id: d._id, ...d })) });
  } catch (e) {
    next(e);
  }
});

app.post("/api/products", async (req, res, next) => {
  try {
    const name = (req.body && req.body.name) ? String(req.body.name).trim() : "";
    const category = (req.body && req.body.category) ? String(req.body.category).trim() : "Other";
    const supplier = (req.body && req.body.supplier) ? String(req.body.supplier).trim() : "";
    const stockQty = Number(req.body && req.body.stockQty);
    const unitPriceInr = Number(req.body && req.body.unitPriceInr);

    if (!name) {
      return res.status(400).json({ error: "invalid_request", message: "name is required" });
    }
    if (!Number.isFinite(stockQty) || stockQty < 0) {
      return res.status(400).json({ error: "invalid_request", message: "stockQty must be a number >= 0" });
    }
    if (!Number.isFinite(unitPriceInr) || unitPriceInr < 0) {
      return res.status(400).json({ error: "invalid_request", message: "unitPriceInr must be a number >= 0" });
    }

    const id = `prod_${crypto.randomUUID()}`;
    const levelPct = Math.max(0, Math.min(100, Math.round((stockQty / 200) * 100)));
    const status = stockQty === 0 ? "Out of Stock" : (levelPct < 15 ? "Low Stock" : "In Stock");
    const doc = {
      _id: id,
      name,
      category,
      stockQty,
      stockText: `${stockQty} units`,
      levelPct,
      unitPriceInr,
      supplier,
      status,
      createdAt: new Date(),
    };

    const db = getDb();
    await db.collection("products").insertOne(doc);
    return res.status(201).json({ ok: true, product: { id, name, category, stockQty, unitPriceInr, supplier, status } });
  } catch (e) {
    next(e);
  }
});

// Customers (separate from demo dataset)
app.get("/api/customers/list", async (req, res, next) => {
  try {
    const db = getDb();
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 500);
    const docs = await db
      .collection("customers")
      .find({}, { projection: { _id: 1, name: 1, phone: 1, visits: 1, totalSpentInr: 1, loyaltyPoints: 1, progressPct: 1, segment: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    res.json({ count: docs.length, customers: docs.map((d) => ({ id: d._id, ...d })) });
  } catch (e) {
    next(e);
  }
});

app.post("/api/customers", async (req, res, next) => {
  try {
    const name = (req.body && req.body.name) ? String(req.body.name).trim() : "";
    const phone = (req.body && req.body.phone) ? String(req.body.phone).trim() : "";
    const segment = (req.body && req.body.segment) ? String(req.body.segment).trim() : "New";

    if (!name) {
      return res.status(400).json({ error: "invalid_request", message: "name is required" });
    }
    if (!phone) {
      return res.status(400).json({ error: "invalid_request", message: "phone is required" });
    }

    const id = `cust_${crypto.randomUUID()}`;
    const doc = {
      _id: id,
      name,
      phone,
      visits: 0,
      totalSpentInr: 0,
      loyaltyPoints: 0,
      progressPct: 0,
      segment,
      createdAt: new Date(),
    };

    const db = getDb();
    await db.collection("customers").insertOne(doc);
    return res.status(201).json({ ok: true, customer: { id, name, phone, segment } });
  } catch (e) {
    next(e);
  }
});

// Invoices (Billing)
app.get("/api/invoices", async (req, res, next) => {
  try {
    const db = getDb();
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 200);
    const docs = await db
      .collection("invoices")
      .find({}, { projection: { _id: 1, customer: 1, date: 1, amountInr: 1, taxInr: 1, payment: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    res.json({ count: docs.length, invoices: docs.map((d) => ({ id: d._id, ...d })) });
  } catch (e) {
    next(e);
  }
});

app.post("/api/invoices", async (req, res, next) => {
  try {
    const customer = (req.body && req.body.customer) ? String(req.body.customer).trim() : "";
    const amountInr = Number(req.body && req.body.amountInr);
    const taxInr = Number(req.body && req.body.taxInr);
    const payment = (req.body && req.body.payment) ? String(req.body.payment).trim() : "—";
    const status = (req.body && req.body.status) ? String(req.body.status).trim() : "Pending";

    if (!customer) {
      return res.status(400).json({ error: "invalid_request", message: "customer is required" });
    }
    if (!Number.isFinite(amountInr) || amountInr <= 0) {
      return res.status(400).json({ error: "invalid_request", message: "amountInr must be a number > 0" });
    }
    if (!Number.isFinite(taxInr) || taxInr < 0) {
      return res.status(400).json({ error: "invalid_request", message: "taxInr must be a number >= 0" });
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const date = `${dd} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const id = `INV-${now.getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const doc = { _id: id, customer, date, amountInr, taxInr, payment, status, createdAt: now };

    const db = getDb();
    await db.collection("invoices").insertOne(doc);
    return res.status(201).json({ ok: true, invoice: { id, customer, date, amountInr, taxInr, payment, status } });
  } catch (e) {
    next(e);
  }
});

// Orders (end-user booking/order)
app.post("/api/orders", requireRole("user", "admin"), async (req, res, next) => {
  try {
    const productId = (req.body && req.body.productId) ? String(req.body.productId).trim() : "";
    const productName = (req.body && req.body.productName) ? String(req.body.productName).trim() : "";
    const qty = Number(req.body && req.body.qty);
    const address = (req.body && req.body.address) ? String(req.body.address).trim() : "";
    const note = (req.body && req.body.note) ? String(req.body.note).trim() : "";

    if (!productId && !productName) {
      return res.status(400).json({ error: "invalid_request", message: "productId or productName is required" });
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      return res.status(400).json({ error: "invalid_request", message: "qty must be a number > 0" });
    }
    if (!address) {
      return res.status(400).json({ error: "invalid_request", message: "address is required" });
    }

    const db = getDb();
    const id = `ord_${crypto.randomUUID()}`;
    const now = new Date();
    const doc = {
      _id: id,
      userId: req.user.id,
      userName: req.user.displayName || req.user.username,
      productId: productId || null,
      productName: productName || null,
      qty,
      address,
      note,
      status: "Pending",
      createdAt: now,
    };
    await db.collection("orders").insertOne(doc);
    return res.status(201).json({ ok: true, order: { id, status: doc.status } });
  } catch (e) {
    next(e);
  }
});

app.get("/api/orders/my", requireRole("user", "admin"), async (req, res, next) => {
  try {
    const db = getDb();
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 200);
    const docs = await db
      .collection("orders")
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    res.json({ count: docs.length, orders: docs.map((d) => ({ id: d._id, ...d })) });
  } catch (e) {
    next(e);
  }
});

app.get("/api/orders", requireRole("shopkeeper", "admin"), async (req, res, next) => {
  try {
    const db = getDb();
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 500);
    const docs = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    res.json({ count: docs.length, orders: docs.map((d) => ({ id: d._id, ...d })) });
  } catch (e) {
    next(e);
  }
});

// Shops (retail users can add their shop)
app.get("/api/shops", async (req, res, next) => {
  try {
    const db = getDb();
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 200);
    const docs = await db
      .collection("shops")
      .find({}, { projection: { _id: 1, name: 1, type: 1, address: 1, lat: 1, lng: 1 } })
      .limit(limit)
      .toArray();

    res.json({
      count: docs.length,
      shops: docs.map((d) => ({
        id: d._id,
        name: d.name,
        type: d.type,
        address: d.address,
        lat: d.lat,
        lng: d.lng,
      })),
    });
  } catch (e) {
    next(e);
  }
});

app.post("/api/shops", async (req, res, next) => {
  try {
    const name = (req.body && req.body.name) ? String(req.body.name).trim() : "";
    const type = (req.body && req.body.type) ? String(req.body.type).trim() : "Retail";
    const address = (req.body && req.body.address) ? String(req.body.address).trim() : "";
    const lat = Number(req.body && req.body.lat);
    const lng = Number(req.body && req.body.lng);

    if (!name) {
      return res.status(400).json({ error: "invalid_request", message: "name is required" });
    }
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ error: "invalid_request", message: "lat and lng are required" });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: "invalid_request", message: "lat/lng out of range" });
    }

    const db = getDb();
    const id = `shop_${crypto.randomUUID()}`;
    const doc = {
      _id: id,
      name,
      type,
      address,
      lat,
      lng,
      location: { type: "Point", coordinates: [lng, lat] },
      createdAt: new Date(),
    };

    await db.collection("shops").insertOne(doc);
    return res.status(201).json({ ok: true, shop: { id, name, type, address, lat, lng } });
  } catch (e) {
    next(e);
  }
});

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Nearby shops lookup (for end-customer nearest shop details)
// Example: /api/shops/nearby?lat=12.97&lng=77.59&limit=5
app.get("/api/shops/nearby", async (req, res, next) => {
  const lat = toNumber(req.query.lat);
  const lng = toNumber(req.query.lng);
  const limit = Math.min(Math.max(Number(req.query.limit || 5), 1), 20);

  if (lat === null || lng === null) {
    return res.status(400).json({
      error: "invalid_request",
      message: "lat and lng query params are required",
    });
  }

  try {
    const db = getDb();
    const docs = await db
      .collection("shops")
      .find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [lng, lat] },
          },
        },
      })
      .limit(limit)
      .toArray();

    const shops = docs.map((s) => ({
      id: s._id,
      name: s.name,
      address: s.address,
      lat: s.lat,
      lng: s.lng,
      distanceKm:
        typeof s.lat === "number" && typeof s.lng === "number"
          ? haversineKm(lat, lng, s.lat, s.lng)
          : null,
    }));

    return res.json({ from: { lat, lng }, count: shops.length, shops });
  } catch (e) {
    return next(e);
  }
});

// 404 handler for API
app.use("/api", (req, res) => {
  res.status(404).json({ error: "not_found", path: req.originalUrl });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: "internal_error" });
});

async function ensureSeed(db) {
  // Ensure indexes
  await db.collection("shops").createIndex({ location: "2dsphere" });
  await db.collection("users").createIndex({ username: 1, role: 1 }, { unique: true });

  // Seed datasets (single document per domain)
  const datasets = db.collection("datasets");
  const datasetsCount = await datasets.countDocuments();
  if (datasetsCount === 0) {
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
    ].map((d) => ({ ...d, createdAt: new Date() }));

    await datasets.insertMany(docs);
  }

  // Seed shops
  const shopsCol = db.collection("shops");
  const shopsCount = await shopsCol.countDocuments();
  if (shopsCount === 0) {
    const shops = (sample.shops || []).map((s) => ({
      _id: s.id,
      name: s.name,
      type: s.type || "Shop",
      address: s.address,
      lat: s.lat,
      lng: s.lng,
      location: { type: "Point", coordinates: [s.lng, s.lat] },
      createdAt: new Date(),
    }));
    if (shops.length) await shopsCol.insertMany(shops);
  }

  // Seed demo users (idempotent)
  {
    const usersCol = db.collection("users");
    const now = new Date();

    const demoUsers = [
      { _id: "usr_admin", username: "admin", role: "admin", displayName: "Admin", password: "admin123" },
      { _id: "usr_shop", username: "shop", role: "shopkeeper", displayName: "Shopkeeper", password: "shop123" },
      { _id: "usr_user", username: "user", role: "user", displayName: "User", password: "user123" },
    ];

    const ops = [];
    for (const u of demoUsers) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      ops.push({
        updateOne: {
          filter: { username: u.username, role: u.role },
          update: {
            $setOnInsert: {
              _id: u._id,
              username: u.username,
              role: u.role,
              displayName: u.displayName,
              passwordHash,
              createdAt: now,
            },
          },
          upsert: true,
        },
      });
    }

    if (ops.length) await usersCol.bulkWrite(ops, { ordered: false });
  }

  // Seed products (inventory demo rows) — idempotent upsert
  {
    const productsCol = db.collection("products");
    const items = (sample.inventory && Array.isArray(sample.inventory.items)) ? sample.inventory.items : [];
    const now = new Date();
    const ops = items.map((p) => ({
      updateOne: {
        filter: { _id: p.id },
        update: {
          $setOnInsert: {
            _id: p.id,
            name: p.name,
            category: p.category,
            stockQty: null,
            stockText: p.stock,
            levelPct: p.levelPct,
            unitPriceInr: p.unitPriceInr,
            supplier: p.supplier,
            status: p.status,
            createdAt: now,
          },
        },
        upsert: true,
      },
    }));
    if (ops.length) await productsCol.bulkWrite(ops, { ordered: false });
  }

  // Seed invoices (billing demo rows) — idempotent upsert
  {
    const invoicesCol = db.collection("invoices");
    const items = (sample.billing && Array.isArray(sample.billing.invoices)) ? sample.billing.invoices : [];
    const now = new Date();
    const ops = items.map((inv) => ({
      updateOne: {
        filter: { _id: inv.id },
        update: {
          $setOnInsert: {
            _id: inv.id,
            customer: inv.customer,
            date: inv.date,
            amountInr: inv.amountInr,
            taxInr: inv.taxInr,
            payment: inv.payment,
            status: inv.status,
            createdAt: now,
          },
        },
        upsert: true,
      },
    }));
    if (ops.length) await invoicesCol.bulkWrite(ops, { ordered: false });
  }

  // Seed customers (customer demo rows) — idempotent upsert
  {
    const customersCol = db.collection("customers");
    const items = (sample.customers && Array.isArray(sample.customers.list)) ? sample.customers.list : [];
    const now = new Date();
    const ops = items.map((c) => ({
      updateOne: {
        filter: { _id: c.id },
        update: {
          $setOnInsert: {
            _id: c.id,
            name: c.name,
            phone: c.phone,
            visits: c.visits,
            totalSpentInr: c.totalSpentInr,
            loyaltyPoints: c.loyaltyPoints,
            progressPct: c.progressPct,
            segment: c.segment,
            createdAt: now,
          },
        },
        upsert: true,
      },
    }));
    if (ops.length) await customersCol.bulkWrite(ops, { ordered: false });
  }
}

async function start() {
  await connectToMongo();
  const db = getDb();
  await ensureSeed(db);

  const requestedPort = Number(process.env.PORT || 3000);

  const listenOnPort = (port) => new Promise((resolve, reject) => {
    const s = app.listen(port);
    s.once("listening", () => resolve(s));
    s.once("error", reject);
  });

  let server;
  try {
    server = await listenOnPort(requestedPort);
  } catch (e) {
    // Local-dev nicety: if 3000 is busy, fall back to 3001.
    // (Some environments set PORT=3000 globally; we still want a smooth local run.)
    if (e && e.code === "EADDRINUSE" && requestedPort === 3000) {
      const fallbackPort = requestedPort + 1;
      // eslint-disable-next-line no-console
      console.warn(`Port ${requestedPort} is already in use. Trying ${fallbackPort}...`);
      server = await listenOnPort(fallbackPort);
    } else {
      throw e;
    }
  }

  const actualPort = (server.address() && server.address().port) ? server.address().port : requestedPort;
  // eslint-disable-next-line no-console
  console.log(`BizCare backend running on http://localhost:${actualPort}`);

  const shutdown = async () => {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log("HTTP server closed");
    });
    await closeMongo();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server.");
  if (err && err.code === "EADDRINUSE") {
    // eslint-disable-next-line no-console
    console.error(`Port ${process.env.PORT || 3000} is already in use.`);
    // eslint-disable-next-line no-console
    console.error("Stop the other process or set PORT to a free port (e.g., PORT=3001). ");
  } else {
    // eslint-disable-next-line no-console
    console.error("If this is a DB connection issue, check MONGODB_URI (Atlas) or ensure local MongoDB is running.");
  }
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
