const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// ==========================================
// CONNECT DATABASE
// ==========================================

connectDB();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send("TrueFix Server Running");
});

// ==========================================
// API ROUTES
// ==========================================

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/contacts",
  contactRoutes
);

// ==========================================
// SERVER
// ==========================================

const PORT =
  process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `TrueFix server running at http://127.0.0.1:${PORT}`
  );
});