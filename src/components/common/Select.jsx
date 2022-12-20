import styled from 'styled-components';

const Select = () => {
  return (
    <StyledDiv>
      <Option>옵션을 넣어주세요</Option>
    </StyledDiv>
  );
};

const StyledDiv = styled.select`
  :hover {
    cursor: pointer;
    background-color: #f8f9fa;
  }
  appearance: none;
  color: #bbc8d4;
  width: 330px;
  height: 50px;
  border: 1px solid #bbc8d4;
  border-radius: 6px;
  padding: 10px;
`;

const Option = styled.option``;

export default Select;
