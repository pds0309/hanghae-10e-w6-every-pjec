import styled from 'styled-components';
import useClickAway from '../../hooks/useClickAway';
import { Colors } from '../../styles';

const SelectBox = ({ visible, onClose, children, location = -30, boxMarginTop = 14 }) => {
  const { ref } = useClickAway(onClose);
  return (
    <Wrapper visible={visible}>
      <Box ref={ref} location={location} boxMarginTop={boxMarginTop}>
        {children}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: relative;
  height: 0;
`;

const Box = styled.div`
  position: absolute;
  min-width: 100px;
  padding: 10px;
  z-index: 999;
  margin-top: ${props => props.boxMarginTop + 'px'};
  border-radius: 6px;
  box-shadow: 0px 0px 2px ${Colors.brand};
  background-color: white;
  left: ${props => props.location + 'px'};
`;

export default SelectBox;
