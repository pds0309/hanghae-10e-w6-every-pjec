import React, { useState } from 'react';
import { __postComment } from '../../redux/modules/commentsSlice';

// import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import DivideLine from './DivideLine';
import Button from './Button';

const Comments = () => {
  // const { postId } = useParams();
  const dispatch = useDispatch();

  const userId = 1; //있다고 치기
  const postId = Date.now(); //있다고 치기

  const [comment, setComment] = useState('');

  const postComment = () => {
    if (userId) {
      dispatch(__postComment({ postId, comment }));
      return setComment('');
    }
    alert('로그인 해주세요.');
  };

  const onChangeComment = e => {
    setComment(e.target.value);
  };
  // 댓글 개수 조회해서 숫자 바뀌게 하기 추가
  return (
    <Wrap>
      <CommentTitle>
        댓글 목록(<span>3</span>)
      </CommentTitle>
      <DivideLine />
      <CommentTextarea
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={onChangeComment}
      ></CommentTextarea>
      <Button onClick={postComment}>댓글 등록</Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 80%;
  margin: auto;
`;

const CommentTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const CommentTextarea = styled.textarea`
  ::placeholder {
    color: #bbc8d4;
  }
  font-size: 16px;
  font-weight: 600;
  width: -webkit-fill-available;
  height: 80px;
  border: 2px solid #bbc8d4;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  resize: none;
`;

export default Comments;
