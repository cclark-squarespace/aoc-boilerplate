module.exports = (lines) => {
  const body = [];
  const posMap = { "0,0": true };

  for (let i = 0; i < 10; i++) {
    body.push([0, 0]);
  }

  lines.forEach((line) => {
    let [dir, num] = line.split(" ");
    num = parseInt(num);

    for (let i = 0; i < num; i++) {
      const [hPos, ...rest] = body;

      // Handle head movement
      if (dir === "U") {
        hPos[1] = hPos[1] + 1;
      }
      if (dir === "D") {
        hPos[1] = hPos[1] - 1;
      }
      if (dir === "R") {
        hPos[0] = hPos[0] + 1;
      }
      if (dir === "L") {
        hPos[0] = hPos[0] - 1;
      }

      rest.forEach((pos, index) => {
        const prevPos = body[index];

        const dx = prevPos[0] - pos[0];
        const dy = prevPos[1] - pos[1];

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          const mx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
          const my = dy > 0 ? 1 : dy < 0 ? -1 : 0;

          pos[0] = pos[0] + mx;
          pos[1] = pos[1] + my;

          if (index === rest.length - 1) {
            posMap[pos.join(",")] = true;
          }
        }
      });
    }
  });

  return Object.values(posMap).length;
};
