import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userApi from '../apis/userApi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Label from '../components/common/Label';
import ValidationText from '../components/common/ValidationText';
import { USER_VALIDATION } from '../constants/validation';
import useInput from '../hooks/useInput';
import { login } from '../redux/modules/UserSlice';
import { Colors } from '../styles';
import { setToken } from '../utils/tokenHandler';

const Signin = () => {
  const dispatch = useDispatch();
  const [loginId, loginIdValidation, handleChangeLoginId] = useInput('', USER_VALIDATION.LOGIN_ID);
  const [password, setPassword] = useState('');
  const [LoginFailedMessage, setLoginFailedMessage] = useState('');
  const navigation = useNavigate();
  const handleFormSubmit = e => {
    e.preventDefault();
    if (loginIdValidation.isInputValidated && password) {
      userApi
        .login({ loginId, password })
        .then(res => {
          const { authorization } = res.data;
          setToken(authorization);
          dispatch(login());
          navigation('/');
        })
        .catch(err => setLoginFailedMessage(err.errorMessage));
    }
  };
  return (
    <Wrap>
      <Title>
        <span style={{ color: Colors.brand }}>SERVICE</span> NAME 로그인
      </Title>
      <FormWrap onSubmit={handleFormSubmit}>
        <Label>로그인 ID</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="ID를 입력하세요."
          autoFocus
          required
          value={loginId}
          onChange={handleChangeLoginId}
        />
        {!loginIdValidation.isInputValidated && (
          <ValidationText isValidationSuccess={loginIdValidation.isInputValidated}>
            {loginIdValidation.message}
          </ValidationText>
        )}
        <Label>비밀번호</Label>
        <Input
          width="366px"
          height="30px"
          placeholder="비밀번호를 입력하세요."
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <ButtonWrap>
          <Button style={{ height: '50px' }}>로그인</Button>
        </ButtonWrap>
        <ValidationText isValidationSuccess={false}>{LoginFailedMessage}</ValidationText>
      </FormWrap>
      <RedirectSignupWrap>
        <p style={{ fontWeight: '500' }}>앗 처음이시라구요?</p>
        <RedirectLink to="/signup">회원가입</RedirectLink>
      </RedirectSignupWrap>
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
  box-shadow: 1px 1px 7px 0px ${Colors.brand};
  margin: 30px;
  padding: 30px 90px 40px 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const ButtonWrap = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RedirectSignupWrap = styled.div`
  display: flex;
  grid-column-gap: 16px;
  justify-content: center;
  align-items: center;
`;

const RedirectLink = styled(Link)`
  color: ${Colors.brand};
  text-decoration-line: underline;
`;

export default Signin;
