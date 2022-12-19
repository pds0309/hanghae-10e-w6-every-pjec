import styled from 'styled-components';

const PostSection = ({ children }) => {
  return <Section>{children}</Section>;
};

const Section = styled.div`
  margin: 40px auto;
  padding: 0 120px;
`;

export default PostSection;
