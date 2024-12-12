module.exports = (currentTime, startTime, endTime) => {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const currentMinutes = toMinutes(currentTime);
  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);

  if (currentMinutes < startMinutes) {
    return -1;
  } else if (currentMinutes > endMinutes) {
    return 1;
  } else {
    return 0;
  }
};
