
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

const carsRoutes = require("./routes/carsRoutes");
const postRoutes = require("./routes/postRoutes");

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));


// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Routes for cars and posts
app.use('/api/cars', carsRoutes);
app.use('/api/posts', postRoutes);

// Home route rendering an HTML view
app.get("/", function(req, res) {
  res.render("index"); // Assuming you have an 'index.ejs' file in a 'views' folder
});

// Route for getting car details by ID
app.get('/api/cars/:id', function(req, res) {
  // Add logic to retrieve and send car details based on the provided ID
  res.send(`Details for Car ID ${req.params.id}`);
});

// Custom middleware for handling 404 errors
app.use(function(req, res) {
  res.status(404);
  res.json({ error: "Resource not found" });
});

// Start the server
app.listen(port, function() {
  console.log(`Server is listening on port: ${port}`);
});


