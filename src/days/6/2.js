module.exports = ([code]) => {
  const chars = code.split("");

  let prevChars = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    const matchedCharIndex = prevChars.indexOf(char);

    if (matchedCharIndex !== -1) {
      prevChars = prevChars.slice(matchedCharIndex + 1);
    }

    prevChars.push(char);

    if (prevChars.length === 14) {
      return i + 1;
    }
  }
};
