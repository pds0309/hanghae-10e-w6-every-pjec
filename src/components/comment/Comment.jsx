import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { __editComment, __deleteComment } from '../../redux/modules/CommentSlice';

import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';
import DivideLine from '../common/DivideLine';
import TwinInfoBox from '../common/TwinInfoBox';

const Comment = ({ commentInfo, userInfo }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleToggle = () => {
    setToggle(prev => !prev);
    setNewComment(commentInfo.comment);
  };

  const onChange = e => {
    setNewComment(e.target.value);
  };

  const editComment = () => {
    if (newComment === commentInfo.comment) {
      return alert('변경된 내용이 없습니다.');
    }
    const commentId = commentInfo.commentId;
    const comment = newComment;
    dispatch(__editComment({ commentId, comment }));
    handleToggle();
  };

  const deleteComment = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const commentId = commentInfo.commentId;
      dispatch(__deleteComment(commentId));
    }
  };

  return (
    commentInfo && (
      <div>
        <TopWrap>
          <UserWrap>
            <ProfileImage imageUrl={commentInfo.image} />
            <TwinInfoBox
              leftContent={userInfo ? userInfo.nickname : commentInfo.nickname}
              rightContent={commentInfo.createdAt}
              style={{ marginBottom: '-6px' }}
            />
          </UserWrap>
          {userInfo && userInfo.userId === commentInfo.userId && (
            <ButtonWrap>
              {!toggle ? (
                <>
                  <Button onClick={handleToggle}>수정하기</Button>
                  <Button onClick={deleteComment}>삭제하기</Button>
                </>
              ) : (
                <>
                  <Button onClick={editComment}>수정하기</Button>
                  <Button onClick={handleToggle}>수정취소</Button>
                </>
              )}
            </ButtonWrap>
          )}
        </TopWrap>
        {!toggle ? (
          <CommentBox>{commentInfo.comment}</CommentBox>
        ) : (
          <EditTextarea value={newComment} onChange={onChange}></EditTextarea>
        )}
        <DivideLine />
      </div>
    )
  );
};

const UserWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  grid-column-gap: 9px;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const Button = styled.div`
  font-size: small;
  text-decoration: underline;
  color: #6d7d8b;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentBox = styled.div`
  height: 100px;
  margin: 10px 0px 20px 0px;
`;

const EditTextarea = styled.textarea`
  font-size: 16px;
  font-weight: 600;
  width: -webkit-fill-available;
  height: 55px;
  border: 1px solid #bbc8d4;
  border-radius: 4px;
  padding: 20px;
  margin: 10px 0px 0px 0px;
  resize: none;
`;

export default Comment;
