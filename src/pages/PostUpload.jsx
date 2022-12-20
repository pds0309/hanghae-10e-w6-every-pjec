import React from 'react';
import styled from 'styled-components';
import Label from '../components/common/Label';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import DivideLine from '../components/common/DivideLine';
import TwinInputBox from '../components/common/TwinInputBox';
import Select from '../components/common/Select';

const Postupload = () => {
  return (
    <Wrap>
      <SectionWrap>
        <h2>모집 기본 정보 입력</h2>
        <DivideLine />
        <TwinInputBox leftContent={<Label>모집구분</Label>} rightContent={''} />
        <TwinInputBox
          leftContent={<Select style={{ width: '330px', height: '50px' }} placeholder="프로젝트" />}
          rightContent={''}
        />
        <br />
        <TwinInputBox
          leftContent={<Label>진행방식</Label>}
          rightContent={<Label>진행기간</Label>}
        />
        <TwinInputBox
          leftContent={<Select style={{ width: '330px', height: '50px' }} placeholder="온라인" />}
          rightContent={
            <Select style={{ width: '330px', height: '50px' }} placeholder="1개월 미만" />
          }
        />
        <br />
        <TwinInputBox
          leftContent={<Label>시작예정일</Label>}
          rightContent={<Label>진행기간</Label>}
        />
        <TwinInputBox
          leftContent={
            <Select
              style={{ width: '330px', height: '50px' }}
              type="date"
              placeholder="1개월 미만"
            />
          }
          rightContent={
            <Select style={{ width: '330px', height: '50px' }} placeholder="1개월 미만" />
          }
        />
      </SectionWrap>
      <br />
      <br />
      <br />
      <SectionWrap>
        <h2>상세 정보 입력</h2>
        <DivideLine />
        <Label>제목</Label>
        <Input
          style={{ marginTop: '10px', marginBottom: '30px' }}
          width="730px"
          height="30px"
          placeholder="제목을 입력하세요"
        />
        <Label>내용</Label>
        <TextBox placeholder="내용을 입력하세요" />
      </SectionWrap>
      <ButtonWrap>
        <Button>등록하기</Button>
        <Button style={{ marginLeft: '30px' }} btnTheme={'secondary'}>
          뒤로가기
        </Button>
      </ButtonWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionWrap = styled.div`
  width: 764px;
`;

const TextBox = styled.textarea`
  ::placeholder {
    font-weight: 100;
  }
  font-size: 16px;
  font-weight: 600;
  width: -webkit-fill-available;
  height: 700px;
  border: 1px solid #bbc8d4;
  border-radius: 6px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  resize: none;
`;

const ButtonWrap = styled.div`
  margin-right: 43%;
`;

export default Postupload;
