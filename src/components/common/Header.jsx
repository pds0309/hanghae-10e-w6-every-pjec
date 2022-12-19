import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login, logout, __getMyProfile } from '../../redux/modules/UserSlice';
import { Colors } from '../../styles';

const Header = ({ user, isLogined }) => {
  const dispatch = useDispatch();
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
        <HeaderLink to="profile">{user.nickname}</HeaderLink>
        <HeaderLink to="" onClick={handleLogoutClick}>
          로그아웃
        </HeaderLink>
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
