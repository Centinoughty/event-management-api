module.exports.generateId = () => {
  const charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let res = "";
  for (let i = 0; i < 8; i++) {
    res += charecters[Math.floor(Math.random() * charecters.length)];
  }

  return res;
};
