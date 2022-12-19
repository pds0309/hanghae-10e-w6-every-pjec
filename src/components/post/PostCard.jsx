import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../styles';
import ProfileImage from '../common/ProfileImage';
import TwinInfoBox from '../common/TwinInfoBox';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate('/postdetail/' + post.postId);
  };
  return (
    <CardWrap>
      <Title onClick={handleTitleClick}>
        <span>{post.title}</span>
      </Title>
      <ContentsContainer>
        #{post.division}&nbsp;#{post.onoff}
      </ContentsContainer>
      <StackContainer>{post?.stack.split(',').map(st => ' #' + st + ' ') ?? ' '}</StackContainer>
      <WriterInfoContainer>
        <div style={{ display: 'flex', gridColumnGap: '10px', marginTop: '3px' }}>
          <ProfileImage imageUrl={post.image} />
          <div style={{ marginTop: '3px' }}>{post.nickname}</div>
        </div>
        <TwinInfoBox leftContent="시작일" rightContent={post.startDate} />
      </WriterInfoContainer>
    </CardWrap>
  );
};

const Title = styled.div`
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 10px;
  margin-top: 16px;
  font-weight: 700;
  font-size: 24px;
  height: 70px;
  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const ContentsContainer = styled.div`
  font-weight: 400;
  margin-bottom: 10px;
  font-size: 20px;
  line-height: 163.15%;
  color: ${Colors.grey};
`;

const StackContainer = styled(ContentsContainer)`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  height: 70px;
`;

const WriterInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardWrap = styled.div`
  width: 24%;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0px 0px 8px #ce7777;
`;

export default PostCard;
