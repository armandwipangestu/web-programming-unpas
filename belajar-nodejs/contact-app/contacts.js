const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const validator = require("validator");
const dir_path = "./data";
const data_path = `${dir_path}/contacts.json`;

// init data folder
if (!fs.existsSync(dir_path)) {
  fs.mkdirSync(dir_path);
}

// init file contacts.json
if (!fs.existsSync(data_path)) {
  fs.writeFileSync(data_path, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => {
    return contact.nama === nama;
  });

  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  // Cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  // Cek nomor hp
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor hp tidak valid"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold("Terimakasih sudah memasukkan data."));
};

const banner = () => {
  return chalk.cyan.bold(figlet.textSync("Daftar Kontak :"));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(banner());

  contacts.forEach((contact, index) => {
    console.log(`${index + 1}: ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => {
    return contact.nama.toLowerCase() === nama.toLowerCase();
  });

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(banner());
  console.log(`nama: ${chalk.cyan.bold(contact.nama)}`);
  console.log(`no handphone: ${contact.noHP}`);
  if (contact.email) {
    console.log(`email: ${contact.email}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => {
    return contact.nama.toLowerCase() !== nama.toLowerCase();
  });

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(
    chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`)
  );
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
