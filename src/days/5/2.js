module.exports = (lines) => {
  const stacks = [];

  for (let line of lines) {
    if (line.includes("[")) {
      const chars = line.split("");
      for (let i = 0; i < chars.length; i += 4) {
        const letter = chars[i + 1].trim();

        if (letter) {
          if (!stacks[i / 4]) {
            stacks[i / 4] = [];
          }

          stacks[i / 4].push(letter);
        }
      }
    }

    if (line.includes("move")) {
      const [, n1, n2, n3] = line.match(/move (\d*) from (\d*) to (\d*)/);

      const charsToMove = stacks[parseInt(n2) - 1].splice(0, n1);
      stacks[parseInt(n3) - 1].unshift(...charsToMove);
    }
  }

  return stacks.map((stack) => stack.shift()).join("");
};
