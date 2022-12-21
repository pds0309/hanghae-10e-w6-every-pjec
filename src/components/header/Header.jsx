import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login, logout, __getMyProfile } from '../../redux/modules/UserSlice';
import { Colors } from '../../styles';
import SelectBox from './SelectBox';
import ProfileImage from '../common/ProfileImage';

const Header = ({ user, isLogined }) => {
  const dispatch = useDispatch();
  const [myBoxVisible, setMyBoxVisible] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (accessToken) {
      dispatch(__getMyProfile());
      dispatch(login());
    }
  }, [isLogined]);

  const handleLogoutClick = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const UnAuthSectionContents = () => {
    return (
      <>
        <HeaderLink to="signup">회원가입</HeaderLink>
        <HeaderLink to="signin">로그인</HeaderLink>
      </>
    );
  };

  const AuthSectionContents = () => {
    return (
      <>
        {/* TODO: 인증 상태 시 헤더바 UI/기능 완성하기 */}
        <HeaderLink to="postupload">모집글 작성</HeaderLink>
        <div style={{ display: 'flex', gridColumnGap: '6px' }}>
          <div>
            <ProfileImage imageUrl={user.image} size={28} />
          </div>
          <HeaderLink to="/" onClick={() => setMyBoxVisible(!myBoxVisible)}>
            <Name>{user.nickname}</Name>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99999 8.78132L11.3 5.48132L12.2427 6.42399L7.99999 10.6667L3.75732 6.42399L4.69999 5.48132L7.99999 8.78132Z"
                fill="#6D7D8B"
              />
            </svg>
            <SelectBox visible={myBoxVisible}>
              <MyBoxLink to="profile">내 정보</MyBoxLink>
              <MyBoxLink to="/post">내 작성글</MyBoxLink>
              <MyBoxLink to="/" onClick={handleLogoutClick}>
                로그아웃
              </MyBoxLink>
            </SelectBox>
          </HeaderLink>
        </div>
      </>
    );
  };

  return (
    <StyledHeader>
      <div>
        <HeaderLink to="/">
          <Logo>LOGO</Logo>
        </HeaderLink>
      </div>
      <RightSection>
        {isLogined && user ? <AuthSectionContents /> : <UnAuthSectionContents />}
      </RightSection>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 26px 0;
`;

const RightSection = styled.div`
  display: flex;
  grid-column-gap: 30px;
`;

const Logo = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const Name = styled.span`
  font-size: 14px;
  color: ${Colors.grey};
  :hover {
    color: black;
    opacity: 0.8;
  }
`;

const MyBoxLink = styled(Link)`
  display: block;
  padding: 10px;
  font-size: 14px;
  line-height: 163.15%;
  font-weight: 500;
  color: ${Colors.grey};
  :hover {
    color: ${Colors.brand};
    font-weight: 700;
  }
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 600;
  :hover {
    color: ${Colors.brand};
  }
`;

export default Header;
