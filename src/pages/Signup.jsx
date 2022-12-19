import React from 'react';
import userApi from '.././apis/userApi';

import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';

import styled from 'styled-components';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import ValidationText from '../components/common/ValidationText';

const Signup = () => {
  const navigate = useNavigate();
  const [loginId, onChangeID, isValidID, validTextID] = useInput('', 'loginId');
  const [nickname, onChangeNickname, isValidNickname, validTextNickname] = useInput('', 'nickname');

  const idCheck = loginId;
  const [password, onChangePW, isValidPW, validTextPW] = useInput('', 'password', idCheck);

  const pwCheck = password;
  const [pwconfirm, onChangePWconfirm, isValidPWconfirm, validTextPWConfirm] = useInput(
    '',
    'pwconfirm',
    pwCheck,
  );
  //중복검사는 onBlur
  const postUserInfo = async e => {
    e.preventDefault();
    if (isValidID && isValidNickname && isValidPW && isValidPWconfirm) {
      try {
        await userApi.join({
          loginId,
          nickname,
          password,
          pwconfirm,
        });
      } catch (e) {
        alert(e);
      }
    }
    navigate('/signin');
  };

  return (
    <Wrap>
      <Title>
        <span style={{ color: '#CE7777' }}>SERVICE</span> NAME 회원가입
      </Title>
      <FormWrap onSubmit={postUserInfo}>
        <Label>로그인 ID</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="ID를 입력하세요."
          value={loginId}
          onChange={onChangeID}
          autoFocus
          required
        />
        <ValidationText isValidationSuccess={isValidID}>{validTextID}</ValidationText>
        <Label>닉네임</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={onChangeNickname}
          required
        />
        <ValidationText isValidationSuccess={isValidNickname}>{validTextNickname}</ValidationText>
        <Label>비밀번호</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={onChangePW}
          required
        />
        <ValidationText isValidationSuccess={isValidPW}>{validTextPW}</ValidationText>
        <Label>비밀번호 확인</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          value={pwconfirm}
          onChange={onChangePWconfirm}
          required
        />
        <ValidationText isValidationSuccess={isValidPWconfirm}>{validTextPWConfirm}</ValidationText>
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
