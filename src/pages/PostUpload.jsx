import React from 'react';
import { useNavigate } from 'react-router-dom';
import postApi from '../apis/postApi';
import PostSubmit from '../components/post/PostSubmit';

const Postupload = () => {
  const navigate = useNavigate();
  const postUpload = post => {
    postApi
      .register({
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
        alert('게시글 등록 완료!');
        navigate('/');
      })
      .catch(err => alert(err.errorMessagae));
  };
  return (
    <>
      <PostSubmit post={{}} submitApi={post => postUpload(post)} pageName="등록" />
    </>
  );
};

export default Postupload;
