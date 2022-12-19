import React from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import ValidationText from '../components/common/ValidationText';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userApi from '.././apis/userApi';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrap = styled.form`
  border: 2px solid #ffffff;
  width: fit-content;
  height: fit-content;
  margin: 30px;
  padding: 30px 90px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  box-shadow: 1px 1px 7px 0px #ce7777;
`;

const ButtonWrap = styled.div`
  padding-top: 20px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [loginId, onChangeID, validID, validTextID] = useInput('', 'loginId');
  const [nickname, onChangeNickname, validNickname, validTextNickname] = useInput('', 'nickname');
  const pwIncludeIDCheck = loginId;
  const [password, onChangePW, validPW, validTextPW] = useInput('', 'password', pwIncludeIDCheck);
  const pwCheck = password;
  const [pwconfirm, onChangePWconfirm, validPWconfirm, validTextPWConfirm] = useInput(
    '',
    'pwconfirm',
    pwCheck,
  );
  //중복검사는 onBlur
  const postUserInfo = async e => {
    e.preventDefault();
    if (validID && validNickname && validPW && validPWconfirm) {
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
      <Label>회원가입</Label>
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
        <ValidationText isValidationSuccess={validID}>{validTextID}</ValidationText>
        <Label>닉네임</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={onChangeNickname}
          required
        />
        <ValidationText isValidationSuccess={validNickname}>{validTextNickname}</ValidationText>
        <Label>비밀번호</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={onChangePW}
          required
        />
        <ValidationText isValidationSuccess={validPW}>{validTextPW}</ValidationText>
        <Label>비밀번호 확인</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          value={pwconfirm}
          onChange={onChangePWconfirm}
          required
        />
        <ValidationText isValidationSuccess={validPWconfirm}>{validTextPWConfirm}</ValidationText>
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

export default Signup;
