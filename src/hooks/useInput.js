import { useState } from 'react';

const useInput = (initValue, checkType, compareCheck) => {
  const [value, setValue] = useState(initValue);

  let isValid = false;
  let validText = '';

  const IDCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,}$/;

  if (value.length !== 0) {
    switch (checkType) {
      case 'loginId':
        IDCheck.test(value) && value.length >= 4 && value.length <= 12
          ? (isValid = true)
          : (isValid = false);

        isValid
          ? (validText = '사용 가능한 ID입니다.')
          : (validText =
              'ID는 영문 대문자, 소문자, 숫자를 포함하며, 4자 이상 12자 이하여야합니다.');
        break;

      case 'nickname':
        value.length >= 4 && value.length <= 12 ? (isValid = true) : (isValid = false);

        isValid
          ? (validText = '사용 가능한 닉네임입니다.')
          : (validText = '닉네임은 4자 이상 12자 이하여야합니다.');
        break;

      case 'password':
        if (compareCheck.length !== 0) {
          value.length >= 4 && value.length <= 12 && !value.includes(compareCheck)
            ? (isValid = true)
            : (isValid = false);
        } else {
          value.length >= 4 && value.length <= 12 ? (isValid = true) : (isValid = false);
        }

        isValid
          ? (validText = '사용 가능한 비밀번호입니다.')
          : (validText = '비밀번호는 4자 이상 12자 이하여야하며, 아이디를 포함하지 않아야합니다.');
        break;

      case 'pwconfirm':
        value.length !== 0 && value === compareCheck ? (isValid = true) : (isValid = false);

        isValid
          ? (validText = '비밀번호가 일치합니다.')
          : (validText = '비밀번호가 일치하지 않습니다.');
        break;

      default:
        validText = 'error: Input Error';
    }
  }

  const onChange = e => setValue(e.target.value);

  return [value, onChange, isValid, validText];
};

export default useInput;
