module.exports = (lines) => {
  let register = 1;
  let cycle = 0;

  const output = [];

  lines.forEach((line) => {
    const [command, count] = line.split(" ");

    let amountToAdd = 0;
    let cycleToAdd = 0;

    if (command === "noop") {
      cycleToAdd = 1;
    } else {
      cycleToAdd = 2;
      amountToAdd = Number(count);
    }

    for (let i = 0; i < cycleToAdd; i++) {
      cycle++;

      const cycleIndex = cycle - 1;

      const y = Math.floor(cycleIndex / 40);
      const x = cycleIndex % 40;

      if (!output[y]) {
        output[y] = [];
      }

      const isLit = x >= register - 1 && x <= register + 1;

      output[y][x] = isLit ? "#" : ".";
    }

    register += amountToAdd;
  });

  return output.map((l) => l.join(" ")).join("\n");
};
