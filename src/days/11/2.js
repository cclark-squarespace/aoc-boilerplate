const stepCache = {};

module.exports = (lines, raw) => {
  const steps = raw.split(/\n\s*\n/);

  const monkeyItems = [];
  const monkeyScore = [];
  let modulo = 1;

  const command = (operator, num) => (old) => {
    const useNum = num === "old" ? old : Number(num);

    if (operator === "+") {
      return old + useNum;
    } else if (operator === "*") {
      return old * useNum;
    }
  };

  const parseStep = (step) => {
    if (stepCache[step]) {
      return stepCache[step];
    }

    const [l1, l2, l3, l4, l5, l6] = step
      .split("\n")
      .map((s) => s.split(":").map((s) => s.trim()));

    const monkeyIndex = Number(l1[0].split(" ")[1]);

    const startingItems = l2[1]
      .split(",")
      .filter((s) => !!s)
      .map((s) => Number(s.trim()));

    const monkeyCommand = (() => {
      const [, operator, num] = l3[1].match(/new = old ([+*]) (.+)/);
      return command(operator, num);
    })();

    const divisibleBy = Number(l4[1].replace("divisible by ", ""));
    const trueIndex = Number(l5[1].replace("throw to monkey ", ""));
    const falseIndex = Number(l6[1].replace("throw to monkey ", ""));

    const data = {
      monkeyIndex,
      startingItems,
      monkeyCommand,
      divisibleBy,
      trueIndex,
      falseIndex,
    };

    stepCache[step] = data;

    return data;
  };

  steps.forEach((step) => {
    const { monkeyIndex, startingItems, divisibleBy } = parseStep(step);
    monkeyItems[monkeyIndex] = startingItems;
    monkeyScore[monkeyIndex] = 0;
    modulo = modulo * divisibleBy;
  });

  for (let i = 0; i < 10000; i++) {
    steps.forEach((step) => {
      const { monkeyIndex, monkeyCommand, divisibleBy, trueIndex, falseIndex } =
        parseStep(step);

      while (monkeyItems[monkeyIndex].length > 0) {
        const itemToInspect = monkeyItems[monkeyIndex].shift();
        const newWorryLevel = monkeyCommand(itemToInspect) % modulo;

        monkeyScore[monkeyIndex]++;

        if (newWorryLevel % divisibleBy === 0) {
          monkeyItems[trueIndex].push(newWorryLevel);
        } else {
          monkeyItems[falseIndex].push(newWorryLevel);
        }
      }
    });
  }

  monkeyScore.sort((a, b) => b - a);

  return monkeyScore[0] * monkeyScore[1];
};
