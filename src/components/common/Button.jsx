import { Colors } from '../../styles';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ children, btnTheme, btnColor, btnSize, onClick, ...props }) => {
  return (
    <StyledButton
      btnTheme={btnTheme}
      btnColor={btnColor}
      btnSize={btnSize}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const buttonSizeProps = {
  normal: {
    fontSize: '16px',
    padding: '6px 18px',
  },
  large: {
    fontSize: '18px',
    padding: '10px 26px',
  },
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  btnTheme: PropTypes.oneOf(['primary', 'secondary']),
  btnColor: PropTypes.oneOf(['warning', 'brand']),
  btnSize: PropTypes.oneOf(['normal', 'large']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  btnTheme: 'primary',
  btnColor: 'brand',
  btnSize: 'normal',
};

const StyledButton = styled.button`
  padding: ${props => buttonSizeProps[props.btnSize].padding};
  cursor: pointer;
  font-weight: 700;
  font-size: ${props => buttonSizeProps[props.btnSize].fontSize};
  border-radius: 6px;
  border: 1px solid ${Colors.black};
  color: ${props => (props.btnTheme === 'primary' ? 'white' : Colors[props.btnColor])};
  background-color: ${props => (props.btnTheme === 'primary' ? Colors[props.btnColor] : '#FFFFFF')};
  :hover {
    opacity: 0.75;
  }
`;

export default Button;
