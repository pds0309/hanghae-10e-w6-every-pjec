import styled from 'styled-components';
import { Colors } from '../../styles';

const Label = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

const StyledLabel = styled.label`
  display: block;
  font-size: 18px;
  line-height: 163.15%;
  font-weight: 500;
  color: ${Colors.grey};
  margin: 10px 0 0 5px;
`;

export default Label;
