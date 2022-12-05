module.exports = (lines) => {
  const sum = lines.reduce((acc, line) => {
    const [a1, a2] = line.split(",");
    const [[min1, max1], [min2, max2]] = [
      a1.split("-").map(Number),
      a2.split("-").map(Number),
    ];
    if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return sum;
};
