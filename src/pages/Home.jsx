import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
  const [postList, setPostList] = useState('');

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:3001/postList');
    setPostList(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };
  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
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
    </div>
  );
};

const Backgr = styled.div`
  width: 1440px;
  height: 400px;
  left: 0px;
  top: 72px;
  background: #d9d9d9;
`;

const StBtn = styled.div`
  display: flex;
  padding: 10px 10px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Btn1 = styled.div`
  width: 43px;
  height: 36px;
  left: 141px;
  top: 558px;
  margin-left: 33px;

  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #ce7777;
`;
const Btn2 = styled.div`
  width: 86px;
  height: 36px;
  left: 214px;
  top: 558px;
  margin-left: 33px;

  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;

  color: #6d7d8b;
`;
const Btn3 = styled.div`
  width: 65px;
  height: 36px;
  left: 330px;
  top: 558px;
  margin-left: 33px;

  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #6d7d8b;
`;
const HomeItem = styled.div`
  width: 364px;
  height: 333px;
  padding: 33px, 33px, 33px, 33px;

  background: #ffffff;
  box-shadow: 0px 0px 8px #ce7777;
  border-radius: 18px;

  display: flex;
  justify-content: center;
  align-content: center;
`;

const Homewarp = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const HomeItemTitle = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  color: #000000;
`;
const HomeItemContent = styled.div`
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
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
  justify-content: space-between;
`;

export default Home;
