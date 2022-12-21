export const getFormattedDate = date => {
  const inputDate = date ?? new Date().toISOString();
  return inputDate.substring(0, 16).replace('T', ' ');
};
