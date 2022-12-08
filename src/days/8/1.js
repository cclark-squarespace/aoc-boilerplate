module.exports = (lines) => {
  const heights = lines.map((line) => line.split("").map(Number));

  const columns = heights[0].length;
  const rows = heights.length;

  let visibleInner = 0;
  const tracked = {};

  const incIfNotTracked = (x, y) => {
    if (!tracked[`${x} ${y}`]) {
      visibleInner++;
      tracked[`${x} ${y}`] = 1;
    }
  };

  for (let y = 1; y < columns - 1; y++) {
    let maxL = heights[y][0];
    let maxR = heights[y][rows - 1];

    for (let x = 1; x < rows - 1; x++) {
      const curH = heights[y][x];
      if (curH > maxL) {
        incIfNotTracked(x, y);
      }
      maxL = Math.max(maxL, curH);
    }

    for (let x = rows - 1; x > 1; x--) {
      const curH = heights[y][x];
      if (curH > maxR) {
        incIfNotTracked(x, y);
      }
      maxR = Math.max(maxR, curH);
    }
  }

  for (let x = 1; x < rows - 1; x++) {
    let maxT = heights[0][x];
    let maxB = heights[rows - 1][x];

    for (let y = 1; y < columns - 1; y++) {
      const curH = heights[y][x];
      if (curH > maxT) {
        incIfNotTracked(x, y);
      }
      maxT = Math.max(maxT, curH);
    }

    for (let y = columns - 1; y > 1; y--) {
      const curH = heights[y][x];
      if (curH > maxB) {
        incIfNotTracked(x, y);
      }
      maxB = Math.max(maxB, curH);
    }
  }

  const edgeVisible = rows * 2 + (columns - 2) * 2;

  return visibleInner + edgeVisible;
};
