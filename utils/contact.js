const fs = require("fs");

let makeJSON = () => {
  // Membuat file direktori
  const dirPath = "./data";
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Membuat file contacts.json
  const dataPath = "./data/contacts.json";
  if (!fs.existsSync(dataPath)) {
    fs.writeFile(dataPath, "[]", "utf-8", (err, data) => {
      if (err) throw err;
    });
  }
};

// Function load semua data
let loadContact = () => {
  const dataContacts = fs.readFileSync("./data/contacts.json", "utf-8");
  const contact = JSON.parse(dataContacts);
  return contact;
};

// resave contact
let resaveContact = (data) => {
  fs.writeFileSync("./data/contacts.json", JSON.stringify(data));
};

// Find One function
let findOne = (data) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.name == data);
  return contact;
};

// Save Contact
let addContact = (data) => {
  const contacts = loadContact();
  contacts.push(data);
  resaveContact(contacts);
};

// Delete Contact
let deleteContact = (data) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.name !== data);
  resaveContact(newContacts);
};

// Edit Contact
let editContact = (data) => {
  const contacts = loadContact();
  const newContact = {
    id: data.id,
    name: data.name,
    email: data.email,
    mPhone: data.mPhone,
  };
  contacts.push(newContact);
  resaveContact(contacts);
};

module.exports = {
  makeJSON,
  loadContact,
  resaveContact,
  addContact,
  deleteContact,
  findOne,
  editContact,
};
