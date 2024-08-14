export const calculateDuration = (startDateSec: number, endDateSec: number) => {
  if (!startDateSec || !endDateSec) {
    return "Please provide both start and end dates.";
  }

  //   const start = parseInt(startDateSec);
  //   const end = parseInt(endDateSec);

  if (startDateSec >= endDateSec) {
    return "End date must be greater than start date.";
  }

  const diffSeconds = endDateSec - startDateSec;

  let duration = "";

  if (diffSeconds > 6 * 30 * 24 * 60 * 60) {
    // more than 6 months
    duration = Math.ceil(diffSeconds / (365 * 24 * 60 * 60)) + " years";
  } else if (diffSeconds > 15 * 24 * 60 * 60) {
    // more than 15 days
    duration = Math.ceil(diffSeconds / (30 * 24 * 60 * 60)) + " months";
  } else if (diffSeconds > 12 * 60 * 60) {
    // more than 12 hours
    duration = Math.ceil(diffSeconds / (24 * 60 * 60)) + " days";
  } else {
    duration = diffSeconds + " seconds";
  }

  return duration;
};
