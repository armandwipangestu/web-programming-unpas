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
