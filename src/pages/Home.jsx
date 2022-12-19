import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
  const [postList, setPostList] = useState('');

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/posts');
    setPostList(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };
  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Wrap>
      <Backgr></Backgr>
      <StBtn>
        <Btn1>전체</Btn1>
        <Btn2>프로젝트</Btn2>
        <Btn3>스터디</Btn3>
      </StBtn>
      <Homewarp>
        {postList &&
          postList.map(item => (
            <HomeItem key={item.Id}>
              <div>
                <div>{item.postId}</div>
                <HomeItemTitle>{item.title}</HomeItemTitle>
                <HomeItemContent>
                  {item.content},{item.division},{item.onoff},{item.stack}
                </HomeItemContent>
                <HomeItemBottom>
                  <div>{item.userId}</div>
                  <div>{item.contact}</div>
                  <div>{item.startDate}</div>
                </HomeItemBottom>
              </div>
            </HomeItem>
          ))}
      </Homewarp>
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

const StBtn = styled.div`
  display: flex;
  padding: 0px 80px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Btn1 = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #ce7777;
  margin-left: 3%;
`;

const Btn2 = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #6d7d8b;
  margin-left: 2%;
`;

const Btn3 = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #6d7d8b;
  margin-left: 2%;
`;

const HomeItem = styled.div`
  width: 24%;
  height: 333px;
  padding: 30px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 0px 8px #ce7777;
`;

const Homewarp = styled.div`
  width: 1400px;
  padding-left: 8%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const HomeItemTitle = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: #000000;
`;

const HomeItemContent = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 163.15%;
  color: #6d7d8b;
`;

const HomeItemBottom = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 163.15%;
  color: #000000;
`;

export default Home;
