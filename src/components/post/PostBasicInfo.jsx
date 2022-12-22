import React from 'react';
import styled from 'styled-components';
import Label from '../common/Label';

const PostBasicInfo = ({ labelName, children, width = 300 }) => {
  return (
    <InfoContainer width={width}>
      <Label>{labelName}</Label>
      <InfoDetails>{children}</InfoDetails>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: ${props => props.width + 'px'};
  margin-bottom: 10px;
`;

const InfoDetails = styled.p`
  font-size: 20px;
  margin-left: 5px;
  margin-top: 10px;
  font-weight: 600;
`;

export default PostBasicInfo;
