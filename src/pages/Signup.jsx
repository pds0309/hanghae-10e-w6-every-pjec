import React, { useCallback, useEffect, useState } from 'react';
import userApi from '.././apis/userApi';

import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';

import styled from 'styled-components';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import ValidationText from '../components/common/ValidationText';
import { USER_VALIDATION } from '../constants/validation.js';
import { Colors } from '../styles';
const Signup = () => {
  const navigate = useNavigate();
  //value, valid, onChange
  const [loginId, loginIdValidation, handleChangeLoginId] = useInput('', USER_VALIDATION.LOGIN_ID);

  const [nickname, nicknameValidation, handleChangeNickname] = useInput(
    '',
    USER_VALIDATION.NICKNAME,
  );

  const [password, passwordValidation, handlePasswordChange] = useInput(
    '',
    USER_VALIDATION.PASSWORD,
    loginId,
  );

  const [pwconfirm, pwConfirmValidation, handlePwConfirmChange] = useInput(
    '',
    USER_VALIDATION.PASSWORD_CONFIRM,
    password,
  );

  const [nicknameDuplicated, setNicknameDuplicated] = useState({
    status: false,
    message: '',
  });
  const [loginIdDuplicated, setLoginIdDuplicated] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    setNicknameDuplicated({
      status: false,
      message: '',
    });
  }, [nickname]);

  useEffect(() => {
    setLoginIdDuplicated({
      status: false,
      message: '',
    });
  }, [loginId]);

  //TODO: 동일한 인풋에 대한 요청일 때 메모이제이션 해서 함수 호출 막기

  const handleBlurNickname = () => {
    if (!nicknameValidation.isInputValidated) {
      return;
    }
    userApi
      .validateNickname(nickname)
      .then(res => setNicknameDuplicated({ status: true, message: res.data.message }))
      .catch(err => setNicknameDuplicated({ status: false, message: err.errorMessage }));
  };

  const handleBlurLoginId = useCallback(() => {
    if (!loginIdValidation.isInputValidated) {
      return;
    }
    userApi
      .validateLoginId(loginId)
      .then(res => setLoginIdDuplicated({ status: true, message: res.data.message }))
      .catch(err => setLoginIdDuplicated({ status: false, message: err.errorMessage }));
  }, [loginId]);

  const checkInputValidated = () => {
    return (
      loginIdValidation.isInputValidated &&
      nicknameValidation.isInputValidated &&
      passwordValidation.isInputValidated &&
      pwConfirmValidation.isInputValidated &&
      nicknameDuplicated.status &&
      loginIdDuplicated.status
    );
  };

  //중복검사는 onBlur
  const postUserInfo = async e => {
    e.preventDefault();
    if (checkInputValidated) {
      try {
        await userApi.join({
          loginId,
          nickname,
          password,
          pwconfirm,
        });
        navigate('/signin');
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <Wrap>
      <Title>
        <span style={{ color: Colors.brand }}>애</span>브리
        <span style={{ color: Colors.brand }}>&nbsp;플</span>젝 회원가입
      </Title>
      <FormWrap onSubmit={postUserInfo}>
        <Label>로그인 ID</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="ID를 입력하세요."
          value={loginId}
          onChange={handleChangeLoginId}
          onBlur={handleBlurLoginId}
          autoFocus
          required
        />
        <ValidationText
          isValidationSuccess={loginIdValidation.isInputValidated && loginIdDuplicated.status}
        >
          {!loginIdValidation.isInputValidated
            ? loginIdValidation.message
            : loginIdDuplicated.message || loginIdValidation.message}
        </ValidationText>
        <Label>닉네임</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={handleChangeNickname}
          onBlur={handleBlurNickname}
          required
        />
        <ValidationText
          isValidationSuccess={nicknameValidation.isInputValidated && nicknameDuplicated.status}
        >
          {!nicknameValidation.isInputValidated
            ? nicknameValidation.message
            : nicknameDuplicated.message || nicknameValidation.message}
        </ValidationText>
        <Label>비밀번호</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          value={password}
          type="password"
          onChange={handlePasswordChange}
          required
        />
        <ValidationText isValidationSuccess={passwordValidation.isInputValidated}>
          {passwordValidation.message}
        </ValidationText>
        <Label>비밀번호 확인</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          type="password"
          value={pwconfirm}
          onChange={handlePwConfirmChange}
          required
        />
        <ValidationText isValidationSuccess={pwConfirmValidation.isInputValidated}>
          {pwConfirmValidation.message}
        </ValidationText>
        <ButtonWrap>
          <Button style={{ height: '50px' }}>회원가입</Button>
          <Button
            type="button"
            style={{ height: '50px' }}
            onClick={() => navigate(-1)}
            btnTheme={'secondary'}
          >
            뒤로가기
          </Button>
        </ButtonWrap>
      </FormWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 32px;
  font-weight: 600;
`;

const FormWrap = styled.form`
  width: fit-content;
  height: fit-content;
  border: 2px solid #ffffff;
  border-radius: 18px;
  box-shadow: 1px 1px 7px 0px #ce7777;
  margin: 30px;
  padding: 30px 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const ButtonWrap = styled.div`
  height: 120px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Signup;
