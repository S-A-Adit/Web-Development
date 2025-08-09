const express = require("express");
const path = require("path");

const app = express();

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine & views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from /public (optional, for css/js assets)
app.use(express.static(path.join(__dirname, "public")));

// Sample messages array
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

// Route: Home page — display messages
app.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
  });
});

// Route: New message form
app.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// Route: Handle form submission
app.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  if (messageText && messageUser) {
    messages.push({
      text: messageText,
      user: messageUser,
      added: new Date(),
    });
  }
  res.redirect("/");
});

// Optional: Route to view individual message detail (with index)
app.get("/message/:id", (req, res) => {
  const id = req.params.id;
  const message = messages[id];

  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render("message", { message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
