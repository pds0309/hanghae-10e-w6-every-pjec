import styled from 'styled-components';
import { Colors } from '../../styles';

const ValidationText = ({ children, isValidationSuccess }) => {
  return (
    <StyledValidationText isValidationSuccess={isValidationSuccess}>
      {children}
    </StyledValidationText>
  );
};

const StyledValidationText = styled.p`
  margin: 6px 0 10px 5px;
  font-size: 12px;
  color: ${props => (props.isValidationSuccess ? Colors.success : Colors.warning)};
`;

export default ValidationText;
