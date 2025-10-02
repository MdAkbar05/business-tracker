"use client";
export default function getDate() {
  const today = new Date();

  let month = today.getMonth() + 1; // Months are 0-indexed, so add 1
  let day = today.getDate();
  const year = today.getFullYear();

  // Add leading zero if month or day is less than 10
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}
