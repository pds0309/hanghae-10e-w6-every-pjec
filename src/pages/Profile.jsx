import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../components/common/ProfileImage';
import Button from '../components/common/Button';
import Label from '../components/common/Label';
import { Colors } from '../styles';
import { Link } from 'react-router-dom';

const Profile = (size = { size }) => {
  return (
    <div>
      <Warp>
        <Title>내 프로필</Title>
        <ProfileImage size={200} />
        <ButtonWrap>
          <Button style={{ height: '40px', width: '200px' }}>프로필 변경</Button>
        </ButtonWrap>
      </Warp>
      <Warp>
        <Title>내글자가몇글자까지</Title>
        <Label>로그인 ID</Label>
        <Label>가입일</Label>
        <RedirectLink>변경하기</RedirectLink>
        <Label>닉네임</Label>
        <RedirectLink>변경하기</RedirectLink>
        <Label>기술스택</Label>
      </Warp>
    </div>
  );
};

export default Profile;

const Warp = styled.div`
  margin-top: 132px;
  margin-left: 120px;
`;

const Title = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 57px;

  color: #000000;
`;
const ButtonWrap = styled.div`
  height: 120px;
  padding-top: 20px;
  display: flex;
`;
const RedirectLink = styled(Link)`
  color: ${Colors.brand};
  text-decoration-line: underline;
`;
