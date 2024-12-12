module.exports = (n) => {
  const charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let res = "";
  for (let i = 0; i < n; i++) {
    const randomIdx = Math.floor(Math.random() * charecters.length);
    res += charecters[randomIdx];
  }

  return res;
};
