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
      alert('?????? ?????? ????????? ???????????????!');
      return;
    }
    if (!isDateAfterThanNow(startDate)) {
      alert('????????? ???????????? ???????????????');
      return;
    }
    if (!title) {
      alert('????????? ???????????????!');
      return;
    }
    if (!content) {
      alert('????????? ???????????????');
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
          <h2>?????? ?????? ?????? ??????</h2>
          <DivideLine />
          <TwinInputBox
            leftContent={<Label>????????????</Label>}
            rightContent={<Label>????????????</Label>}
          />
          <TwinInputBox
            leftContent={
              <Selection
                options={DIVISION_OPTIONS}
                placeholder="????????????/?????????"
                setValue={setDivision}
                initialValue={division}
              />
            }
            rightContent={
              <Selection
                options={ONOFF_OPTIONS}
                placeholder="?????????/????????????"
                setValue={setOnoff}
                initialValue={onoff}
              />
            }
          />
          <br />
          <TwinInputBox
            leftContent={<Label>???????????????</Label>}
            rightContent={<Label>????????????</Label>}
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
            leftContent={<Label>????????????</Label>}
            rightContent={<Label>?????????</Label>}
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
          <h2>?????? ?????? ?????? ??????</h2>
          <DivideLine />
          <Label>??????</Label>
          <Input
            style={{ marginTop: '10px', marginBottom: '30px', width: '96%' }}
            height="30px"
            placeholder="????????? ???????????????"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Label>??????</Label>
          {user && rendered && (
            <EditorContainer value={content} onChange={handleContentChange} userId={user.userId} />
          )}
          <br />
          <ButtonWrap>
            <Button type="submit">{pageName}??????</Button>
            <Button
              type="button"
              style={{ marginLeft: '30px' }}
              btnTheme={'secondary'}
              onClick={handleClickBackButton}
            >
              ????????????
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
