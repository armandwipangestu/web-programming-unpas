const { tulisPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await tulisPertanyaan("Masukan nama anda: ");
  const email = await tulisPertanyaan("Masukan email anda: ");
  const noHP = await tulisPertanyaan("Masukan no handphone anda: ");

  simpanContact(nama, email, noHP);
};

main();
