import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Colors } from '../../styles';

const colorStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white', minHeight: '48px' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? Colors.sub
        : undefined,
      color: isDisabled ? '#ccc' : isSelected ? Colors.brand : 'black',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? isSelected : Colors.sub,
      },
    };
  },
};

const Selection = ({
  options,
  isMulti = false,
  placeholder = '옵션선택',
  initialValue = null,
  setValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);
  useEffect(() => {
    if (initialValue !== selectedOption) {
      setValue(selectedOption);
    }
  }, [selectedOption]);
  return (
    <StyledSelect
      placeholder={placeholder}
      isMulti={isMulti}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
      styles={colorStyles}
    />
  );
};

const StyledSelect = styled(Select)`
  :hover {
    cursor: pointer;
    background-color: #f8f9fa;
  }
  color: #bbc8d4;
  width: 330px;
`;

export default Selection;
