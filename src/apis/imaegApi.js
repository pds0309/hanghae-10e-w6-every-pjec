import { imageInstance } from './instance';

const IMAGE_API = '/api/v1/images';

const imageApi = {
  // 프로필 등록
  uploadProfile: formData => imageInstance.post(IMAGE_API + '/profile', formData),
  uploadPost: formData => imageInstance.post(IMAGE_API + '/posts', formData),
};

export default imageApi;
