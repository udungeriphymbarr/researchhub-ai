require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const generationRoutes = require("./routes/generationRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");
const projectRoutes = require("./routes/projectRoutes");
const researchRoutes = require("./routes/researchRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const subscriptionRoutes = 
require("./routes/subscriptionRoutes");

const paymentRoutes =
require("./routes/paymentRoutes");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://researchhub-ai-one.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/generations", generationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/auth", googleAuthRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("ResearchHub AI API Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

