import React from 'react';
import Comments from '../components/comment/Comments';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  return <Comments postId={id} />;
};

export default PostDetail;
