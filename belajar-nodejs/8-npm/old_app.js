const validator = require("validator");
const chalk = require("chalk");

// console.log(validator.isEmail("armandwi.pangestu7@gmail.c"));
// console.log(validator.isMobilePhone("08212345678", "id-ID"));
// console.log(validator.isNumeric("08212345678"));

// console.log(chalk.italic.black.bgBlue("Hello World!"));
const nama = "Arman";
const pesan = chalk`lorem, ipsum dolor {bgBlue.black.strikethrough sit amet} consectetur {bgGreen.italic.black adipisicing} elit. Nama Saya: ${nama}`;
console.log(pesan);
