const validAuthentication = (req, res) => {
  const authorization = { ...req }.headers['authorization'];
  if (!authorization) {
    return res.status(401).send({ errorMessage: '로그인이 필요합니다.' });
  }
  return authorization.split(' ')[1];
};

module.exports = {
  validAuthentication,
};
