require("dotenv").config();
const express = require("express");
const cors = require("cors");

const devaiRoutes = require("./routes/devai.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/devai", devaiRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
