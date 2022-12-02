const fs = require("fs-extra");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const getDayBoilerplate = () =>
  `module.exports = (lines) => {
// return output;
};
`;

const run = () => {
  const { day } = argv;
  fs.outputFileSync(`${__dirname}/days/${day}/1.js`, getDayBoilerplate());
  fs.outputFileSync(`${__dirname}/days/${day}/2.js`, getDayBoilerplate());
  fs.outputFileSync(`${__dirname}/days/${day}/input.txt`, "");
};

run();
