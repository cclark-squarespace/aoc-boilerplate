module.exports = (lines) => {
  const heights = lines.map((line) => line.split("").map(Number));

  const columns = heights[0].length;
  const rows = heights.length;

  let maxScore = 0;

  for (let y = 1; y < columns - 1; y++) {
    for (let x = 1; x < rows - 1; x++) {
      const curH = heights[y][x];

      const scores = { left: 0, right: 0, bottom: 0, top: 0 };

      for (let left = x - 1; left >= 0; left--) {
        scores.left += 1;
        if (heights[y][left] >= curH) {
          break;
        }
      }

      for (let right = x + 1; right < rows; right++) {
        scores.right += 1;
        if (heights[y][right] >= curH) {
          break;
        }
      }

      for (let top = y - 1; top >= 0; top--) {
        scores.top += 1;
        if (heights[top][x] >= curH) {
          break;
        }
      }

      for (let bottom = y + 1; bottom < columns; bottom++) {
        scores.bottom += 1;
        if (heights[bottom][x] >= curH) {
          break;
        }
      }

      const score = Object.values(scores).reduce((acc, s) => acc * s, 1);

      if (score > maxScore) {
        maxScore = score;
      }
    }
  }

  return maxScore;
};
