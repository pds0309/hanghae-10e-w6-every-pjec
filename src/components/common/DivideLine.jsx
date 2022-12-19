import styled from 'styled-components';
import { Colors } from '../../styles';

const DivideLine = () => {
  return <StyledDiv />;
};

const StyledDiv = styled.div`
  display: block;
  height: 1px;
  margin: 12px 0 30px 0;
  background-color: ${Colors.lightGrey};
`;

export default DivideLine;
