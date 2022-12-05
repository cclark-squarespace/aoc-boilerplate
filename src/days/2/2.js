// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

const scores = {
  "A X": 3 + 0,
  "B X": 1 + 0,
  "C X": 2 + 0,

  "A Y": 1 + 3,
  "B Y": 2 + 3,
  "C Y": 3 + 3,

  "A Z": 2 + 6,
  "B Z": 3 + 6,
  "C Z": 1 + 6,
};

module.exports = (lines) => {
  const total = lines.reduce((acc, line) => {
    return acc + scores[line];
  }, 0);

  return total;
};
