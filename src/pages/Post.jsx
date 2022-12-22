import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import LinkGroup from '../components/common/LinkGroup';
import PostCard from '../components/post/PostCard';
import { __myPostById } from '../redux/modules/PostSlice';

const Post = () => {
  const dispatch = useDispatch();
  // 7. store 파일에 리듀서가 넘겨준 상태값을 가져오기
  const myPosts = useSelector(state => state.posts.post);
  // 8. 컴포넌트 안에서 map 돌렸다가 filter 돌렸다가 할 수 있게 state로 값 관리하기
  // 처음 화면엔 전체 데이터를 표시해주니 초기값으로 받아온 값을 설정해주기
  const [postList, setPostList] = useState(myPosts);

  // 밑에서 실행시킬 함수
  const fetchTodos = () => {
    dispatch(__myPostById());
  };

  // 첫 컴포넌트 렌더링 시 리덕스를 실행시킴 (리덕스 파일로 고고우)
  useEffect(() => {
    fetchTodos();
  }, []);

  // 임시필터링 함수
  const getPostFilteredBy = param => {
    // 10. 필터 함수로 사용될 myPosts나 postList 값이 잘 들어오는지 콘솔로 확인하기
    // 11. 필터할때 필터의 필터의 필터의 필터가 되지 않게 전체값으로 필터하기
    // 생각해보니까 상수 따로 안만드시고 그냥 setPostList에 함수 넣으셔도 될 것 같아용
    // setPostList(myPosts?.filter(post => post.division === param)); <== 이런식으로!!
    // 중요한건 '전체 데이터'를 필터링하는 것입니다
    const filterpost = myPosts?.filter(post => post.division === param);
    // 12. 필터가 잘 됐는지 콘솔 찍어보기
    setPostList(filterpost);
    // 13. state값이 잘 설정됐는지 콘솔 찍어보기
    // 끝 ~~~~~~
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
      {/* 9. 맵으로 전체 카드를 보여주는지 확인하기 */}
      <CardListContainer>
        {postList?.map(post => (
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
