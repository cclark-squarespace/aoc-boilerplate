const set = require("../../utils/set");
const get = require("../../utils/get");

module.exports = (lines) => {
  const files = {};

  let curPath = [];

  lines.forEach((line) => {
    const [p1, p2, p3] = line.split(" ");
    if (p1 === "$") {
      if (p2 === "cd") {
        if (p3 === "/") {
          curPath = [];
        } else if (p3 === "..") {
          curPath.pop();
        } else {
          curPath.push(p3);
        }
      } else if (p2 === "ls") {
      }
    } else if (p1 === "dir") {
    } else {
      set(files, [...curPath, p2], parseInt(p1));
    }
  });

  const dirSizes = {};

  const calculate = (path) => {
    const dir = path ? get(files, path) : files;
    let sum = 0;

    for (p in dir) {
      const fileOrDir = dir[p];
      if (typeof fileOrDir === 'object') {
        sum += calculate(path ? [...path, p] : [p]);
      } else {
        sum += fileOrDir;
      }
    }

    dirSizes[path ? path.join("/") : "/"] = sum;

    return sum;
  };

  calculate();

  const curSize = dirSizes["/"];
  const totalSize = 70000000;
  const neededSize = 30000000;
  const deleteMin = curSize - (totalSize - neededSize);

  return Object.values(dirSizes).reduce((acc, amount) => {
    if (amount >= deleteMin && amount < acc) {
      return amount;
    }
    return acc;
  }, Infinity);
};
