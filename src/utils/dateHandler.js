export const getFormattedDate = date => {
  const inputDate = date ?? new Date().toString();
  return inputDate.substring(0, 16).replace('T', ' ');
};
