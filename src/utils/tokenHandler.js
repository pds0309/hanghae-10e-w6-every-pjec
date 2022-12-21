export const setToken = authorization => {
  const tokens = authorization.split('%');
  localStorage.setItem('accessToken', tokens[1]);
  localStorage.setItem('refreshToken', tokens[2]);
  localStorage.setItem('isLogined', true);
};
