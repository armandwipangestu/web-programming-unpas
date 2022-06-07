const fs = require("fs");
const readline = require("readline");
const { stdin: input, stdout: output, stderr, stdout } = require("process");
const rl = readline.createInterface({ input, output });
const { exec } = require("child_process");

rl.question("Enter key: ", (key) => {
  rl.question("Enter value: ", (value) => {
    const object = { [key]: value };
    const file = fs.readFileSync("./api.json", "utf8");
    const objects = JSON.parse(file);

    objects.push(object);
    fs.writeFileSync("./api.json", JSON.stringify(objects));

    rl.question("Do you want to print the result? [y/n] ", (answer) => {
      if (answer === "y" || answer === "Y") {
        exec("cat ./api.json | jq '.' -C", (err, stdout) => {
          console.log(stdout);
        });
      }

      rl.close();
    });
  });
});
