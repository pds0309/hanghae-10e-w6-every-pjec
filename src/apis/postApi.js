import { authInstance, noAuthInstance } from './instance';
import { apiByPathVariable } from './utils';

const POST_API = '/posts';

const postApi = {
  // 게시글 전체 조회
  getAll: () => noAuthInstance.get(POST_API),
  // 게시글 상세 조회
  getById: postId => noAuthInstance.get(apiByPathVariable(POST_API, postId)),
  // 내 게시글 조회
  getMyPosts: () => authInstance.get(apiByPathVariable(POST_API, 'me')),
  // 게시글 등록
  submit: postSubmitRequest => authInstance.post(POST_API, postSubmitRequest),
  // 게시글 업데이트
  updateById: (postId, postUpdateRequest) =>
    authInstance.put(apiByPathVariable(POST_API, postId), postUpdateRequest),
  // 게시글 삭제
  deleteById: postId => authInstance.delete(apiByPathVariable(POST_API, postId)),
};

export default postApi;
