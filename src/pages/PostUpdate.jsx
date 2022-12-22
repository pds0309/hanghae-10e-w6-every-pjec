import React from 'react';
import PostSubmit from '../components/post/PostSubmit';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import postApi from '../apis/postApi';

const PostUpdate = () => {
  const { id } = useParams();
  const { post } = useSelector(state => state.posts);
  const navigate = useNavigate();
  const postUpdate = post => {
    postApi
      .updateById(id, {
        title: post.title,
        content: post.content,
        division: post.division.value,
        onoff: post.onoff.value,
        startDate: post.startDate,
        period: post.period.value,
        stack: post.stack.map(st => st.value).join(','),
        contact: post.contact,
      })
      .then(() => {
        alert('게시글 수정 완료!');
        navigate(-1);
      })
      .catch(err => alert(err.errorMessagae));
  };

  return (
    <>
      <PostSubmit post={post} submitApi={post => postUpdate(post)} pageName="수정" />
    </>
  );
};

export default PostUpdate;
