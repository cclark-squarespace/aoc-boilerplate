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
  const sum = lines.reduce((acc, line) => {
    const [sac1, sac2] = [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2, line.length),
    ];

    const commonCharacter = (() => {
      for (char1 of sac1) {
        for (char2 of sac2) {
          if (char1 === char2) {
            return char1;
          }
        }
      }
    })();

    return acc + getCharPriority(commonCharacter);
  }, 0);

  return sum;
};
