import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styles';
import ProfileImage from '../components/common/ProfileImage';
import Button from '../components/common/Button';
import Label from '../components/common/Label';
import TwinInputBox from '../components/common/TwinInputBox';
import DivideLine from '../components/common/DivideLine';
import ValidationText from '../components/common/ValidationText';

const Profile = (size = { size }) => {
  return (
    <Warp>
      <Title>내 프로필</Title>
      <SectionWrap>
        <ImageWrap>
          <ProfileImage size={200} />
          <ButtonWrap>
            <Button style={{ height: '40px', width: '200px' }}>프로필 변경</Button>
          </ButtonWrap>
        </ImageWrap>
        <InfoWrap>
          <h1 style={{ marginBottom: '0px' }}>내글자가몇글자까지</h1>
          <InfoBox>
            <TwinInputBox
              leftContent={<Label>로그인 ID</Label>}
              rightContent={<Label>가입일</Label>}
            />
            <TwinInputBox
              leftContent={<UpperContent>로그인 아이디에용</UpperContent>}
              rightContent={<UpperContent>가입일이에용</UpperContent>}
            />
          </InfoBox>
        </InfoWrap>
      </SectionWrap>
      <LabelWrap>
        <Label>닉네임</Label>
        <EditButton>변경하기</EditButton>
      </LabelWrap>
      <LowerContent>글씨를 써용</LowerContent>
      <br />
      <br />
      <LabelWrap>
        <Label>기술스택</Label>
        <EditButton>변경하기</EditButton>
      </LabelWrap>
      <LowerContent>글씨를 써용</LowerContent>
      <br />
      <br />
      <DivideLine />
      <Label>회원탈퇴</Label>
      <Button
        style={{ height: '40px', width: '200px', marginTop: '10px', marginBottom: '10px' }}
        btnColor={'warning'}
      >
        회원탈퇴
      </Button>
      <ValidationText isValidationSuccess={false}>
        탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
      </ValidationText>
    </Warp>
  );
};

export default Profile;

const Warp = styled.div`
  width: 900px;
  margin-left: 180px;
`;

const SectionWrap = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 45px;
  width: fit-content;
  margin-bottom: 50px;
`;

const ImageWrap = styled.div``;
const InfoWrap = styled.div`
  margin-left: 120px;
  padding-top: 32px;
`;

const InfoBox = styled.div`
  width: 700px;
`;

const UpperContent = styled.div`
  color: black;
  font-size: 18px;
  margin-left: 4.5px;
`;

const ButtonWrap = styled.div`
  height: 120px;
  padding-top: 20px;
  display: flex;
`;

const LabelWrap = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  color: ${Colors.brand};
  text-decoration-line: underline;
  border: none;
  background-color: transparent;
  margin-top: 13px;
  margin-left: 13px;
`;

const LowerContent = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: 6px;
`;
