import styled from 'styled-components';
import { Colors } from '../../styles';

const AlertCounter = ({ children }) => {
  return (
    <StyledContainer>
      <Count>{children}</Count>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  display: flex;
  right: 1px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background-color: ${Colors.brand};
  align-items: center;
  justify-content: center;
`;

const Count = styled.span`
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  color: white;
  padding-top: 3px;
`;

export default AlertCounter;
