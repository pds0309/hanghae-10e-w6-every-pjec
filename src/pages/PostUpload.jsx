import React from 'react';
import styled from 'styled-components';
import Label from '../components/common/Label';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Postupload = () => {
  return (
    <div>
      <Wrap>모집 기본 정보 입력</Wrap>
      <h1></h1>
      <TopLine></TopLine>
      <Warp2>
        <WarpBox>
          <Label>모집구분</Label>
          <Input width="330px" height="50px" placeholder="프로젝트" />
          <Label>진행방식</Label>
          <Input width="330px" height="50px" placeholder="온라인" />
        </WarpBox>
        <WarpBox>
          <Label>모집인원</Label>
          <Input width="330px" height="50px" placeholder="인원을 입력하세요" />
          <Label>진행기간</Label>
          <Input width="330px" height="50px" placeholder="1개월 미만" />
        </WarpBox>
        <WarpBox>
          <Label>시작예정일</Label>
          <Input width="330px" height="50px" type="date" placeholder="온라인" />
          <Label>진행기간</Label>
          <Input width="330px" height="50px" placeholder="1개월 미만" />
        </WarpBox>
        <WarpBox>
          <Label>기술스택</Label>
          <Input width="330px" height="50px" placeholder="1개월 JavaScript" />
        </WarpBox>
      </Warp2>
      <div>
        <Wrap>상세 정보 입력</Wrap>
        <h1></h1>
        <TopLine></TopLine>
        <WarpBox>
          <Warp2>
            <Label>제목</Label>
            <Input width="730px" height="54px" placeholder="제목을 입력하세요" />
          </Warp2>
        </WarpBox>
        <WarpBox>
          <Warp2>
            <Input width="730px" height="40px" />
            <Input width="730px" height="434.64px" placeholder="내용을 입력하세요" />
          </Warp2>
        </WarpBox>
      </div>
      <ButtonWrap>
        <Button style={{ width: '100px', height: '50px' }}>등록하기</Button>
        <Button style={{ width: '100px', height: '50px' }}>뒤로가기</Button>
      </ButtonWrap>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  margin-left: 338px;
  margin-top: 100px;
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  /* identical to box height */

  color: #000000;
`;
const TopLine = styled.div`
  width: 764px;
  height: 1px;
  top: 1px;
  background: #bbc8d4;
  margin-left: 338px;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

const Warp2 = styled.div`
  margin-left: 320px;
`;
const ButtonWrap = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  margin-left: 338px;
`;

const WarpBox = styled.div`
  margin: auto;
  margin-top: 20px;
  display: inline-block;
  margin-left: 20px;
`;

export default Postupload;
