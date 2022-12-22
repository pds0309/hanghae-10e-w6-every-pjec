import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/comment/CommentList';

import PostThread from '../components/post/PostThread';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <>
      <PostThread postId={id} />
      <CommentList postId={id} />
    </>
  );
};

export default PostDetail;
