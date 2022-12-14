module.exports = (lines) => {
  lines = [...lines.filter((l) => !!l), "[[2]]", "[[6]]"];

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

  lines.sort((a, b) => {
    return getIsCorrectOrder(a, b) ? -1 : 1;
  });

  return lines.reduce((acc, line, index) => {
    if (line === "[[2]]" || line === "[[6]]") {
      return acc * (index + 1);
    }
    return acc;
  }, 1);
};
