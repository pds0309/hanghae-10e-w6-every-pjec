import { authInstance, noAuthInstance } from './instance';

const USER_API = '/user';

const userApi = {
  // 로그인
  login: ({ loginId, password }) => noAuthInstance.post(USER_API + '/login', { loginId, password }),
  // 회원가입
  join: ({ loginId, nickname, password, pwconfirm, image = '' }) =>
    noAuthInstance.post(USER_API + '/signup', {
      loginId,
      nickname,
      password,
      pwconfirm,
      image,
    }),
  // 아이디 중복 체크
  validateLoginId: loginId => noAuthInstance.get(USER_API + `/signup/id?id=${loginId}`),
  // 닉네임 중복 체크
  validateNickname: nickname =>
    noAuthInstance.get(USER_API + `/signup/nickname?nickname=${nickname}`),
  // 회원 본인 정보 조회
  me: () => authInstance.get(USER_API + '/mypage'),
  // 닉네임 정보 수정
  editNickname: ({ nickname }) => authInstance.put(USER_API + `/nick`, { nickname }),
  // 기술 스택 정보 수정
  editStack: ({ stack }) => authInstance.put(USER_API + `/stack`, { stack }),
  // 회원 탈퇴
  deleteAccount: () => authInstance.delete(USER_API + `/secession`),
};

export default userApi;
