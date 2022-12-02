const fs = require("fs-extra");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const getLines = (day) => {
  const rawInput = fs.readFileSync(
    `${__dirname}/days/${day}/input.txt`,
    "utf-8"
  );
  const lines = rawInput.trim().split("\n");
  return lines;
};

const run = () => {
  const { day, star } = argv;
  const lines = getLines(day);
  const runCode = require(`${__dirname}/days/${day}/${star}.js`);
  console.info(runCode(lines));
};

run();
