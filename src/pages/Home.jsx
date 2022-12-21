import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LinkGroup from '../components/common/LinkGroup';
import SliderContainer from '../components/home/SliderContainer';
import PostCard from '../components/post/PostCard';
import { __getAllPosts } from '../redux/modules/PostSlice';

// TODO: 필터 조회
// TODO: 무한스크롤
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (posts) {
      setPostList(posts);
    }
  }, [posts]);

  const fetchTodos = async () => {
    dispatch(__getAllPosts());
  };

  // 임시필터링 함수
  const getPostFilteredBy = param => {
    setPostList(posts.filter(post => post.division === param));
  };

  return (
    <Wrap>
      <Backgr>
        <SliderContainer />
      </Backgr>
      <LinkGroup
        links={['전체', '프로젝트', '스터디']}
        clickFuncs={[
          fetchTodos,
          () => getPostFilteredBy('프로젝트'),
          () => getPostFilteredBy('스터디'),
        ]}
      />
      <CardListContainer>
        {posts && postList.map(post => <PostCard key={post.postId} post={post} />)}
      </CardListContainer>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Backgr = styled.div`
  width: 1480px;
  height: 400px;
  background: #d9d9d9;
`;

const CardListContainer = styled.div`
  padding-left: 8%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

export default Home;
