module.exports = (obj, path, value) => {
  let curObj = obj;

  path.forEach((key, index) => {
    if (index === path.length - 1) {
      curObj[key] = value;
    } else {
      if (!curObj[key]) {
        curObj[key] = {};
      }
      curObj = curObj[key];
    }
  });
};
