import React from 'react';
import Comments from '../components/comment/Comments';
import { useParams } from 'react-router-dom';

import PostThread from '../components/post/PostThread';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <>
      <PostThread postId={id} />
      <Comments postId={id} />
    </>
  );
};

export default PostDetail;
