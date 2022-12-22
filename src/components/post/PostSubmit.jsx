import styled from 'styled-components';
import Button from '../common/Button';
import DivideLine from '../common/DivideLine';
import Input from '../common/Input';
import Label from '../common/Label';
import Selection from '../common/Selection';
import PostSection from '../layouts/PostSection';
import TwinInputBox from '../common/TwinInputBox';
import {
  DIVISION_OPTIONS,
  ONOFF_OPTIONS,
  PERIOD_OPTIONS,
  STACK_OPTIONS,
} from '../../constants/postOptions';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFormattedDate } from '../../utils/dateHandler';
import EditorContainer from '../texteditor/EditorContainer';
import { useSelector } from 'react-redux';

const genOptionByParam = param => {
  return param ? { value: param, label: param } : '';
};

const PostSubmit = ({ post, submitApi, pageName }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { user } = useSelector(state => state.user);
  const [division, setDivision] = useState(genOptionByParam(post?.division));
  const [onoff, setOnoff] = useState(genOptionByParam(post?.onoff));
  const [startDate, setStartDate] = useState(getFormattedDate(post?.startDate).split(' ')[0] ?? '');
  const [period, setPeriod] = useState(genOptionByParam(post?.period));
  const [stack, setStack] = useState(
    post?.stack ? post.stack.split(',').map(st => genOptionByParam(st)) : [],
  );
  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [contact, setContact] = useState(post?.contact ?? '');
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  if (!post && location.pathname.substring(1).indexOf('/') !== -1) {
    const path = location.pathname.substring(1).split('/')[1];
    navigation('/postdetail/' + path);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!division || !onoff || !period || stack.length === 0 || !contact) {
      alert('기본 정보 입력을 확인하세요!');
      return;
    }
    if (!isDateAfterThanNow(startDate)) {
      alert('날짜를 올바르게 선택하세요');
      return;
    }
    if (!title) {
      alert('제목을 확인하세요!');
      return;
    }
    if (!content) {
      alert('내용을 확인하세요');
      return;
    }

    submitApi({ title, content, division, onoff, startDate, period, stack, contact });
  };
  const handleClickBackButton = () => {
    navigation(-1);
  };

  const isDateAfterThanNow = date => {
    return Date.now() < Date.parse(date);
  };

  const handleContentChange = useCallback(e => {
    setContent(e.value);
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PostSection>
          <h2>모집 기본 정보 입력</h2>
          <DivideLine />
          <TwinInputBox
            leftContent={<Label>모집구분</Label>}
            rightContent={<Label>진행방식</Label>}
          />
          <TwinInputBox
            leftContent={
              <Selection
                options={DIVISION_OPTIONS}
                placeholder="프로젝트/스터디"
                setValue={setDivision}
                initialValue={division}
              />
            }
            rightContent={
              <Selection
                options={ONOFF_OPTIONS}
                placeholder="온라인/오프라인"
                setValue={setOnoff}
                initialValue={onoff}
              />
            }
          />
          <br />
          <TwinInputBox
            leftContent={<Label>시작예정일</Label>}
            rightContent={<Label>진행기간</Label>}
          />
          <TwinInputBox
            leftContent={
              <Input
                type="date"
                style={{ width: '300px' }}
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            }
            rightContent={
              <Selection options={PERIOD_OPTIONS} setValue={setPeriod} initialValue={period} />
            }
          />
          <br />
          <TwinInputBox
            leftContent={<Label>기술스택</Label>}
            rightContent={<Label>연락처</Label>}
          />
          <TwinInputBox
            leftContent={
              <Selection
                options={STACK_OPTIONS}
                isMulti={true}
                setValue={setStack}
                initialValue={stack}
              />
            }
            rightContent={
              <Input
                style={{ width: '300px' }}
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
              />
            }
          />
        </PostSection>
        <br />
        <PostSection>
          <h2>모집 상세 정보 입력</h2>
          <DivideLine />
          <Label>제목</Label>
          <Input
            style={{ marginTop: '10px', marginBottom: '30px', width: '96%' }}
            height="30px"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Label>내용</Label>
          {user && rendered && (
            <EditorContainer value={content} onChange={handleContentChange} userId={user.userId} />
          )}
          <ButtonWrap>
            <Button type="submit">{pageName}하기</Button>
            <Button
              type="button"
              style={{ marginLeft: '30px' }}
              btnTheme={'secondary'}
              onClick={handleClickBackButton}
            >
              뒤로가기
            </Button>
          </ButtonWrap>
        </PostSection>
      </form>
    </div>
  );
};

const ButtonWrap = styled.div`
  margin-right: 43%;
`;

export default PostSubmit;
