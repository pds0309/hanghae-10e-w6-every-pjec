import React, { useState, useLayoutEffect } from 'react';
import { __postComment, __fetchComments } from '../../redux/modules/CommentSlice';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import DivideLine from '../common/DivideLine';
import Button from '../common/Button';

import Comment from './Comment';

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const comments = useSelector(state => state.comments.comments);

  const [comment, setComment] = useState('');

  const postComment = () => {
    if (comment) {
      if (user) {
        const userId = user.user.userId;
        dispatch(__postComment({ postId, comment, userId }));
        // return setComment('');
        return window.location.reload();
      }
      alert('로그인 해주세요.');
    }
  };

  const onChangeComment = e => {
    setComment(e.target.value);
  };

  useLayoutEffect(() => {
    dispatch(__fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <Wrap>
      <CommentTitle>
        댓글 목록(<span>{comments.length}</span>)
      </CommentTitle>
      <DivideLine />
      <CommentTextarea
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={onChangeComment}
      ></CommentTextarea>
      <Button style={{ marginBottom: '20px' }} onClick={postComment}>
        댓글 등록
      </Button>
      <div>
        <Comment />
        {comments ? (
          <>
            {comments.map(e => {
              return <Comment key={e.commentId} commentInfo={e} userInfo={user} />;
            })}
          </>
        ) : (
          <></>
        )}
      </div>
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

export default CommentList;
