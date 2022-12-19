export const USER_VALIDATION = Object.freeze({
  LOGIN_ID: {
    SUCCESS: '사용 가능한 아이디입니다.',
    WARNING: 'ID는 영문 대문자, 소문자, 숫자를 포함하며, 4자 이상 12자 이하여야합니다.',
    REGEX: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{4,}$/,
  },
  NICKNAME: {
    SUCCESS: '사용 가능한 닉네임입니다.',
    WARNING: '닉네임은 4자 이상 12자 이하여야합니다.',
    REGEX: /^[a-zA-Z0-9가-힣]{4,12}/g,
  },
  PASSWORD: {
    SUCCESS: '사용 가능한 비밀번호입니다.',
    WARNING: '비밀번호는 아이디를 포함하지 않는 4자 이상 12자 이하여야합니다.',
    REGEX: nickname => {
      if (!nickname) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,}$/;
      }
      return new RegExp(`(?=^[a-zA-Z0-9가-힣]{4,12})(?!${nickname}).*`, 'g');
    },
  },
  PASSWORD_CONFIRM: {
    SUCCESS: '비밀번호가 일치합니다.',
    WARNING: '비밀번호가 일치하지 않습니다.',
    REGEX: password => {
      return password;
    },
  },
});
