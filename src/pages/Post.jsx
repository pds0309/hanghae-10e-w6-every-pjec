import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LinkGroup from '../components/common/LinkGroup';
import PostCard from '../components/post/PostCard';
import { __myPostById } from '../redux/modules/PostSlice';
import { useDispatch } from 'react-redux';

const Post = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetchTodos();
    // if (posts) {
    //   setPostList(posts);
    // }
  }, []);
  const fetchTodos = () => {
    dispatch(__myPostById());
  };

  // 임시필터링 함수
  const getPostFilteredBy = param => {
    console.log(postList);
    const filterpost = postList.mePost.filter(post => post.division === param);
    console.log(filterpost);
    setPostList(postList?.filter(post => post.division === param));
  };
  return (
    <Wrap>
      <Title>내 작성글</Title>
      <LinkGroup
        links={['전체', '프로젝트', '스터디']}
        clickFuncs={[
          fetchTodos,
          () => getPostFilteredBy('프로젝트'),
          () => getPostFilteredBy('스터디'),
        ]}
      />

      <CardListContainer>
        {postList.mePost?.map(post => (
          <PostCard key={post.postId} post={post} />
        ))}
      </CardListContainer>
    </Wrap>
  );
};

const Wrap = styled.div`
  justify-content: center;
  align-items: center;
`;

const CardListContainer = styled.div`
  padding-left: 10%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const Title = styled.div`
  margin-top: 132px;
  margin-left: 120px;

  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 57px;

  color: #000000;
`;

export default Post;
