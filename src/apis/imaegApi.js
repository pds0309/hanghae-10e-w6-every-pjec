import { imageInstance } from './instance';

const IMAGE_API = '/api/v1/images';

const imageApi = {
  // 프로필 등록
  uploadProfile: formData => imageInstance.post(IMAGE_API + '/profile', formData),
};

export default imageApi;
