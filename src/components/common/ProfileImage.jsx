import styled from 'styled-components';
import defaultProfile from '../../assets/img_default_profile.png';
const ProfileImage = ({ imageUrl, size = 30 }) => {
  const handleImageError = e => {
    e.target.src = defaultProfile;
  };
  return (
    <ImageContainer size={size}>
      <img src={imageUrl || defaultProfile} onError={handleImageError} alt="profile" />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  border-radius: 100%;
  & > img {
    width: ${props => props.size + 'px'};
    height: ${props => props.size + 'px'};
    border-radius: 100%;
  }
`;

export default ProfileImage;
