export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero
  const day = ("0" + date.getDate()).slice(-2); // Adding leading zero
  return `${year}-${month}-${day}`;
};
