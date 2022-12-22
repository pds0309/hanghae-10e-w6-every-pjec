import styled from 'styled-components';
import { Colors } from '../../styles';

const Logo = () => {
  return (
    <StyledLogo>
      <Emphasis>애</Emphasis>브리
      <Emphasis style={{ color: Colors.secondary, opacity: 0.8 }}>플</Emphasis>젝
    </StyledLogo>
  );
};

const StyledLogo = styled.span`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 6px;
`;

const Emphasis = styled.span`
  font-weight: 700;
  color: ${Colors.brand};
`;

export default Logo;
