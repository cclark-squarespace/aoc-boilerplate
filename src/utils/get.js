module.exports = (obj, path) => {
  let curObj = obj;

  path.forEach((key) => {
    curObj = curObj[key];
  });

  return curObj;
};
