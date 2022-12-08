const aCharCode = "a".charCodeAt(0);
const ACharCode = "A".charCodeAt(0);

const getCharPriority = (char) => {
  const charCode = char.charCodeAt(0);
  const charIndex =
    1 +
    (charCode > aCharCode ? charCode - aCharCode : charCode - ACharCode + 26);

  return charIndex;
};

module.exports = (lines) => {
  let sum = 0;

  for (let l1 = 0; l1 < lines.length; l1 += 3) {
    const commonChar = (() => {
      const lineLengths = [];
      const dict = {};

      for (let l2 = 0; l2 < 3; l2++) {
        const line = lines[l1 + l2];
        lineLengths.push(line.length);
        line.split("").forEach((char, index) => {
          if (!dict[char]) {
            dict[char] = [];
          }
          if (!dict[char][l2]) {
            dict[char][l2] = index;
          }
        });
      }

      const [li1, li2, li3] = lineLengths;

      for (let char in dict) {
        const indexes = dict[char];

        if (indexes.length !== 3) {
          continue;
        }

        const [i1, i2, i3] = indexes;

        if (i1 < li1 && i2 < li2 && i3 < li3) {
          return char;
        }
      }
    })();

    sum += getCharPriority(commonChar);
  }

  return sum;
};
