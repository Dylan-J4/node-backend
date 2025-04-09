const express = require("express"); // Import the Express framework
const path = require("node:path"); // Node.js module for handling file paths
const app = express(); // Create an Express application

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messenger", messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;
  console.log(req.body);
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });
  res.redirect("/");
});

// Start the server
const PORT = process.env.PORT || 3001; // Use environment port or 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
