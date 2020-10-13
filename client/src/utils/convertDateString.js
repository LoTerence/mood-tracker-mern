export function formatDate(createdAt) {
  let year = createdAt.substring(0, 4);
  let month = createdAt.substring(5, 7);
  let day = createdAt.substring(8, 10);
  return month + "/" + day + "/" + year;
}

export function formatDateTitle(createdAt) {
  let year = createdAt.substring(0, 4);
  let month = createdAt.substring(5, 7);
  let day = createdAt.substring(8, 10);
  let hour = createdAt.substring(11, 13);
  let minute = createdAt.substring(14, 16);
  return month + "/" + day + "/" + year + " " + hour + ":" + minute;
}
