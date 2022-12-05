module.exports = (lines) => {
  const calorieGroups = [];
  let currentCount = 0;

  lines.forEach((line) => {
    const cals = parseInt(line);

    if (isNaN(cals)) {
      calorieGroups.push(currentCount);
      currentCount = 0;
    } else {
      currentCount += cals;
    }
  });

  calorieGroups.sort((a, b) => b - a);

  return calorieGroups.slice(0, 3).reduce((acc, cals) => acc + cals, 0);
};
