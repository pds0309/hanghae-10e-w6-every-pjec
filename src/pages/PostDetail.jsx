import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/comment/CommentList';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <>
      <CommentList postId={id} />
    </>
  );
};

export default PostDetail;
