import { authInstance, noAuthInstance } from './instance';

const USER_API = '/user';

const userApi = {
  // 로그인
  login: ({ loginId, password }) => noAuthInstance.post(USER_API + '/login', { loginId, password }),
  // 회원가입
  join: ({ loginId, nickname, password, pwconfirm, image }) =>
    noAuthInstance.post(USER_API + '/signup', {
      loginId,
      nickname,
      password,
      pwconfirm,
      image,
    }),
  // 아이디 중복 체크
  validateLoginId: loginId => noAuthInstance.get(USER_API + `/signup/id?loginId=${loginId}`),
  // 닉네임 중복 체크
  validateNickname: nickname =>
    noAuthInstance.get(USER_API + `/signup/nickname?nickname=${nickname}`),
  // TODO: 회원 본인 정보 조회
  me: () => authInstance.get(USER_API + '/mypage'),
  // TODO: 회원 정보 수정
};

export default userApi;
