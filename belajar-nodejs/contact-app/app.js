const fs = require("fs");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });

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

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, rejects) => {
    rl.question(pertanyaan, (jawaban) => {
      resolve(jawaban);
    });
  });
};

// const pertanyaan1 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question("Masukan nama anda: ", (nama) => {
//       resolve(nama);
//     });
//   });
// };

// const pertanyaan2 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question("Masukan email anda: ", (email) => {
//       resolve(email);
//     });
//   });
// };

const main = async () => {
  const nama = await tulisPertanyaan("Masukan nama anda: ");
  const email = await tulisPertanyaan("Masukan email anda: ");
  const noHP = await tulisPertanyaan("Masukan no handphone anda: ");

  const contact = { nama, email, noHP };
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  rl.close();
};

main();

// rl.question("Masukan nama anda: ", (nama) => {
//   rl.question("Masukan nomor HP anda: ", (noHP) => {
//     const contact = { nama, noHP };
//     const file = fs.readFileSync("data/contacts.json", "utf8");
//     const contacts = JSON.parse(file);

//     contacts.push(contact);
//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//     rl.close();
//   });
// });
