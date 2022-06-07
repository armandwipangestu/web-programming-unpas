const fs = require("fs");
const chalk = require("chalk");
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

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

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

module.exports = { simpanContact };
