import styled from 'styled-components';
import { Colors } from '../../styles';

const TwinInfoBox = ({ leftContent, rightContent, gap = 12, ...props }) => {
  return (
    <StyledDiv gap={gap} {...props}>
      <p>{leftContent}</p>
      <p>|</p>
      <p>{rightContent}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: inline-flex;

  justify-content: center;
  grid-column-gap: ${props => props.gap + 'px'};
  color: ${Colors.grey};
`;

export default TwinInfoBox;
