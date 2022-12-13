module.exports = (lines) => {
  let endPos;

  const visitedMap = [];
  const queue = [];

  const heightMap = lines.map((line, y) => {
    visitedMap[y] = [];

    return line.split("").map((char, x) => {
      let visited = false;

      if (char === "S") {
        visited = true;
        char = "a";
      } else if (char === "E") {
        endPos = [x, y];
        char = "z";
      }

      if (char === "a") {
        queue.push([[x, y], 0]);
      }

      visitedMap[y][x] = visited;
      return char.charCodeAt(0) - "a".charCodeAt(0);
    });
  });

  let shortest = Infinity;

  while (queue.length > 0) {
    const [[curX, curY], count] = queue.shift();
    const curHeight = heightMap[curY][curX];

    const neighbors = [
      [curX + 1, curY + 0],
      [curX - 1, curY + 0],
      [curX + 0, curY + 1],
      [curX + 0, curY - 1],
    ].filter(([x, y]) => visitedMap[y] && visitedMap[y][x] !== undefined);

    neighbors.forEach(([x, y]) => {
      const newHeight = heightMap[y][x];

      if (newHeight - curHeight > 1) {
        return;
      }

      if (visitedMap[y][x]) {
        return;
      }

      visitedMap[y][x] = true;

      if (x === endPos[0] && y === endPos[1]) {
        shortest = Math.min(shortest, count + 1);
        return;
      }

      queue.push([[x, y], count + 1]);
    });
  }

  return shortest;
};
