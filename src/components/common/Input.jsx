import { Colors } from '../../styles/colors';
import styled from 'styled-components';

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 1px solid ${Colors.lightGrey};
  border-radius: 6px;
  padding: 11px 16px;
  min-width: 120px;
  font-size: 16px;
`;

export default Input;
