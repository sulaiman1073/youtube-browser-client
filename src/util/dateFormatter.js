const formatMonth = month => {
  if (month === 1) return "Jan";
  if (month === 2) return "Feb";
  if (month === 3) return "Mar";
  if (month === 4) return "Apr";
  if (month === 5) return "May";
  if (month === 6) return "Jun";
  if (month === 7) return "Jul";
  if (month === 8) return "Aug";
  if (month === 9) return "Sep";
  if (month === 10) return "Oct";
  if (month === 11) return "Nov";
  if (month === 12) return "Dec";
  return "Month";
};

const dateFormatter = date => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = formatMonth(newDate.getMonth());
  const year = newDate.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default dateFormatter;
