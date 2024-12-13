module.exports = (today, date) => {
  const [eventDay, eventMonth, eventYear] = date.split(" ").map(Number);
  const [todayDay, todayMonth, todayYear] = today.split(" ").map(Number);

  const eventDate = new Date(eventYear, eventMonth - 1, eventDay);
  const todayDate = new Date(todayYear, todayMonth - 1, todayDay);

  if (todayDate < eventDate) {
    return -1;
  } else if (todayDate > eventDate) {
    return 1;
  } else {
    return 0;
  }
};
