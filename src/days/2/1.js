// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

const scores = {
  "A X": 1 + 3,
  "A Y": 2 + 6,
  "A Z": 3 + 0,

  "B X": 1 + 0,
  "B Y": 2 + 3,
  "B Z": 3 + 6,

  "C X": 1 + 6,
  "C Y": 2 + 0,
  "C Z": 3 + 3,
};

module.exports = (lines) => {
  const total = lines.reduce((acc, line) => {
    return acc + scores[line];
  }, 0);

  return total;
};
