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
  justify-content: left;
  color: ${Colors.grey};
`;

const Content = styled.div`
  display: block;
  margin: 15px 0 15px 0;
  font-weight: 600;
  width: 400px;
  height: 20px;
`;

export default TwinInputBox;
