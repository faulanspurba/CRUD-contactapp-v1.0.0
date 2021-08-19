// Local Module
const {
  makeJSON,
  loadContact,
  addContact,
  deleteContact,
  findOne,
  editContact,
} = require("./utils/contact");

// Third party module
const express = require("express");

const app = express();
const port = 3000;

const expressLayouts = require("express-ejs-layouts");

// Method override
const methodOverride = require("method-override");
//Override POST using resource?_method=PUT, DELETE
app.use(methodOverride("_method"));

// Menngunakan ejs
app.set("view engine", "ejs");
// Third-party middleware
app.use(expressLayouts);
// Agar dapat memparsing data req.body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  makeJSON();
  res.render("index", {
    title: "Node JS - home",
    layout: "./layouts/main-layout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "./layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  makeJSON();
  const contacts = loadContact();
  res.render("contact", {
    title: "Contact",
    layout: "./layouts/main-layout",
    contacts,
  });
});

// Router add-contact
app.get("/add-contact", (req, res) => {
  res.render("add-contact", {
    title: "add-contact",
    layout: "./layouts/main-layout",
  });
});

// Save Contact
app.post("/contact", (req, res) => {
  addContact(req.body);
  res.redirect("/contact");
});

// Delete Contact
app.delete("/contact", (req, res) => {
  deleteContact(req.body.name);
  res.redirect("/contact");
});

// Edit data router
app.get("/contact/edit-data/:name", (req, res) => {
  const contact = findOne(req.params.name);
  res.render("edit-contact", {
    title: "EDIT",
    layout: "./layouts/main-layout",
    contact,
  });
  deleteContact(req.params.name);
});

// Edit Contact
app.put("/contact", (req, res) => {
  editContact(req.body);
  res.redirect("/contact");
});

app.listen(port, () => {
  console.log(`App listen to http://localhost:${port}`);
});
