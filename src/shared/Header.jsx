import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../styles';

// TODO: 사용자 인증 상태일 시 UI 변경이 되어야 한다.
const Header = () => {
  return (
    <StyledHeader>
      <div>
        <HeaderLink to="/">
          <Logo>LOGO</Logo>
        </HeaderLink>
      </div>
      <RightSection>
        <HeaderLink to="signup">회원가입</HeaderLink>
        <HeaderLink to="signin">로그인</HeaderLink>
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
