import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles';

const LinkGroup = ({ links, clickFuncs, initialState = 0 }) => {
  const [clickedId, setClickedId] = useState(initialState);

  const handleClick = id => {
    if (clickedId !== id) {
      setClickedId(id);
      clickFuncs[id]();
    }
  };

  useEffect(() => {
    clickFuncs[clickedId]();
  }, [clickedId]);

  return (
    <LinkGroupWrapper>
      {links.map((buttonLabel, i) => (
        <LinkElement
          key={i}
          name={buttonLabel}
          onClick={() => handleClick(i)}
          active={i === clickedId}
        >
          {buttonLabel}
        </LinkElement>
      ))}
    </LinkGroupWrapper>
  );
};

const LinkGroupWrapper = styled.div`
  display: flex;
  grid-column-gap: 24px;
  padding: 0px 120px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const LinkElement = styled.p`
  color: ${props => (props.active ? Colors.brand : Colors.grey)};
  font-weight: ${props => (props.active ? '700' : '400')};
  font-size: 24px;
  cursor: pointer;
`;

export default LinkGroup;
