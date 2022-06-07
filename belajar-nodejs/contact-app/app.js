// mengambil argument dari command line
//console.log(process.argv[2]);
// const command = process.argv[2];
// if (command === "add") {
// } else if (command === "remove") {
// } else if (command === "list") {
// }

// const { tulisPertanyaan, simpanContact } = require("./contacts");

// const main = async () => {
//   const nama = await tulisPertanyaan("Masukan nama anda: ");
//   const email = await tulisPertanyaan("Masukan email anda: ");
//   const noHP = await tulisPertanyaan("Masukan no handphone anda: ");

//   simpanContact(nama, email, noHP);
// };

// main();

const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      // const contact = {
      //   nama: argv.nama,
      //   email: argv.email,
      //   noHP: argv.noHP,
      // };
      // console.log(contact);
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan daftar semua nama & no hp contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no hp contact",
  handler() {
    listContact();
  },
});

// Menampilkan detail sebuah kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail informasi sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// Menghapus sebuah kontak
yargs.command({
  command: "delete",
  describe: "Menhapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
