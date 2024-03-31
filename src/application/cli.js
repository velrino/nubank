const readline = require("readline");

function main(callback) {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  readlineInterface.on("line", callback);
}

const log = console.log;

module.exports = { main, log };
