const fs = require("fs-extra");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const getLines = (day) => {
  const rawInput = fs.readFileSync(
    `${__dirname}/days/${day}/input.txt`,
    "utf-8"
  );
  const raw = rawInput.trim();
  const lines = raw.split("\n");
  return { lines, raw };
};

const run = () => {
  const { day, star } = argv;
  const { lines, raw } = getLines(day);
  const runCode = require(`${__dirname}/days/${day}/${star}.js`);
  console.info(runCode(lines, raw));
};

run();
