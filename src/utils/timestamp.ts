export const timestamps = (seconds: number) => {
  const milliseconds = seconds * 1000;
  const date = new Date(milliseconds);
  const day = date.getDate();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};
