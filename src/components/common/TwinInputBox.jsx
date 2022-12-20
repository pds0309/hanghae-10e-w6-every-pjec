import styled from 'styled-components';
import { Colors } from '../../styles';

const TwinInputBox = ({ leftContent, rightContent, ...props }) => {
  return (
    <StyledDiv {...props}>
      <Content>{leftContent}</Content>
      <Content>{rightContent}</Content>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 32px;
  color: ${Colors.grey};
`;

const Content = styled.p`
  font-weight: 600;
  width: 400px;
  height: 30px;
`;

export default TwinInputBox;
