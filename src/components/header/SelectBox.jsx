import styled from 'styled-components';
import { Colors } from '../../styles';

const SelectBox = ({ visible, children, location = -30 }) => {
  return (
    <Wrapper style={{ display: visible ? 'block' : 'none' }}>
      <Box location={location}>{children}</Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 0;
`;

const Box = styled.div`
  position: absolute;
  min-width: 100px;
  padding: 10px;
  margin-top: 14px;
  z-index: 999;
  border-radius: 6px;
  box-shadow: 0px 0px 2px ${Colors.brand};
  background-color: white;
  left: ${props => props.location + 'px'};
`;

export default SelectBox;
