module.exports = (lines, raw) => {
  const pairs = raw.split(/\n\s*\n/);

  const getValues = (str) => {
    const values = [];
    let curVal = "";
    let nestedCount = 0;

    str
      .slice(1, -1)
      .split("")
      .forEach((char) => {
        if (char === "[") {
          nestedCount++;
        } else if (char === "]") {
          nestedCount--;
        }

        if (char === "," && !nestedCount) {
          values.push(curVal);
          curVal = "";
        } else {
          curVal += char;
        }
      });

    if (curVal) {
      values.push(curVal);
    }

    return values;
  };

  const getIsCorrectOrder = (l1, l2) => {
    const values1 = getValues(l1);
    const values2 = getValues(l2);

    const count = Math.max(values1.length, values2.length) + 1;

    for (let i = 0; i < count; i++) {
      const v1 = values1[i];
      const v2 = values2[i];

      if (v1 === undefined && v2 === undefined) {
        return undefined;
      }

      if (v1 === undefined) {
        return true;
      }

      if (v2 === undefined) {
        return false;
      }

      const int1 = parseInt(v1);
      const int2 = parseInt(v2);

      if (isNaN(int1) && isNaN(int2)) {
        const val = getIsCorrectOrder(v1, v2);
        if (val === undefined) {
          continue;
        } else {
          return val;
        }
      }

      if (isNaN(int1)) {
        const val = getIsCorrectOrder(v1, `[${v2}]`);
        if (val === undefined) {
          continue;
        } else {
          return val;
        }
      }

      if (isNaN(int2)) {
        const val = getIsCorrectOrder(`[${v1}]`, v2);
        if (val === undefined) {
          continue;
        } else {
          return val;
        }
      }

      if (int1 === int2) {
        continue;
      }

      if (int1 < int2) {
        return true;
      }

      if (int1 > int2) {
        return false;
      }

      return int1 < int2;
    }
  };

  let correctOrders = 0;

  pairs.forEach((pair, index) => {
    const [l1, l2] = pair.split("\n");

    const isCorrect = getIsCorrectOrder(l1, l2);

    if (isCorrect) {
      correctOrders += index + 1;
    }
  });

  return correctOrders;
};
