module.exports = (lines) => {
  let hPos = [0, 0];
  let tPos = [0, 0];

  const posMap = { "0,0": true };

  lines.forEach((line) => {
    let [dir, num] = line.split(" ");
    num = parseInt(num);

    for (let i = 0; i < num; i++) {
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

      // Handle tail movement
      const dx = hPos[0] - tPos[0];
      const dy = hPos[1] - tPos[1];

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const mx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
        const my = dy > 0 ? 1 : dy < 0 ? -1 : 0;

        tPos[0] = tPos[0] + mx;
        tPos[1] = tPos[1] + my;

        posMap[tPos.join(",")] = true;
      }
    }
  });

  return Object.values(posMap).length;
};
