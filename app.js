const express = require("express");
const path = require("path");

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Import routes
const pageRoutes = require("./routes/pageRoutes");

// welcome message
app.get('/', (req, res) => res.render('welcome'));

// Use routes
app.use("/admin", pageRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;