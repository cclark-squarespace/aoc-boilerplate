module.exports = (lines) => {
  let strength = 0;
  let register = 1;
  let cycle = 0;

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

      if (cycle === 20 || (cycle - 20) % 40 === 0) {
        strength += register * cycle;
      }
    }

    register += amountToAdd;
  });

  return strength;
};
