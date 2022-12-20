const jsonServer = require('json-server');
const url = require('url');
const { validAuthentication } = require('./authenticationHandler');
// const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = 3001;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/user/signup': '/user',
  }),
);

// 아이디 중복 검사
server.get('/user/signup/id', (req, res) => {
  const { loginId } = url.parse(req.url, true).query;
  const isLoginIdExists = router.db.__wrapped__.user.some(user => user.loginId === loginId);
  if (isLoginIdExists) {
    return res.status(400).send({ result: false, errorMessage: '중복된 아이디입니다.' });
  }
  return res.status(200).send({ result: true, message: '사용할 수 있는 아이디입니다.' });
});

// 닉네임 중복 검사
server.get('/user/signup/nickname', (req, res) => {
  const { nickname } = url.parse(req.url, true).query;
  const isNicknameExists = router.db.__wrapped__.user.some(user => user.nickname === nickname);
  if (isNicknameExists) {
    return res.status(400).send({ result: false, errorMessage: '중복된 닉네임입니다.' });
  }
  return res.status(200).send({ result: true, message: '사용할 수 있는 닉네임입니다.' });
});

server.use(jsonServer.bodyParser);

// 로그인
server.post('/user/login', (req, res) => {
  if (req.body) {
    const { loginId, password } = req.body;
    const user = router.db.__wrapped__.user.find(
      user => user.loginId === loginId && user.password.toString() === password.toString(),
    );
    if (user) {
      return res.status(200).send({
        message: '로그인성공',
        accessToken: `${user.userId}`,
        refreshToken: `${user.userId}`,
      });
    }
  }
  return res.status(400).send({ result: true, errorMessage: '아이디 또는 비밀번호를 확인하세요' });
});

// 내 프로필 조회
server.get('/user/mypage', (req, res) => {
  const authenticatedUserId = validAuthentication(req, res);
  return res.jsonp(router.db.__wrapped__.user.find(user => user.userId == authenticatedUserId));
});

// 게시글 목록 전체 조회
server.get('/posts', (req, res) => {
  const posts = router.db.__wrapped__.posts;
  return res.jsonp(
    posts.map(post => {
      const { userId, nickname, image } = router.db.__wrapped__.user.find(
        user => user.userId === post.userId,
      );
      return { ...post, userId, nickname, image };
    }),
  );
});

// 게시글 상세 조회
server.get('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const response = router.db.__wrapped__.posts.find(post => post.postId === parseInt(postId, 10));
  const user = router.db.__wrapped__.user.find(user => user.userId === response?.userId);
  return response && user
    ? res.jsonp({ ...response, nickname: user.nickname, image: user.image })
    : res.status(404).send({ message: '해당 데이터를 찾을 수 없습니다' });
});

// 댓글 목록 조회
server.get('/comments/:postId', (req, res) => {
  const { postId } = req.params;
  const comments = router.db.__wrapped__.comments.filter(
    comment => comment.postId.toString() === postId,
  );
  return res.jsonp(
    comments.map(comment => {
      const user = router.db.__wrapped__.user.find(user => user.userId === comment.userId);
      return { ...comment, nickname: user.nickname, image: user.image };
    }),
  );
});

// POST 요청으로 자원 생성될 때 custom id 만들어주기
server.use((req, res, next) => {
  if (req.method.toString() === 'POST' && req.originalUrl.indexOf('login') === -1) {
    const reqSplit = req.originalUrl.substring(1).split('/');
    const currentDomain = reqSplit[0];
    if (currentDomain === 'comments') {
      req.url = '/comments';
      req.body['postId'] = reqSplit[1];
    }
    const currentTable = router.db.__wrapped__[currentDomain];
    const currentIdFormat = currentDomain.endsWith('s')
      ? currentDomain.substring(0, currentDomain.length - 1)
      : currentDomain;
    req.body[currentIdFormat + 'Id'] = (currentTable[currentTable.length - 1]?.id ?? 0) + 1;
    req.body['createdAt'] = new Date();
  }
  next();
});

// DELETE, PUT 요청 시 인증상태 검사
server.use((req, res, next) => {
  if (req.method.toString() === 'PUT' || req.method.toString() === 'DELETE') {
    validAuthentication(req, res);
  }
  next();
});

server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});

module.exports = server;
