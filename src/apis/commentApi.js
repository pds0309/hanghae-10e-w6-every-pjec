import { authInstance, noAuthInstance } from './instance';
import { apiByPathVariable } from './utils';

const COMMENT_API = '/comments';

const commentApi = {
  // 댓글 목록 조회
  getAllForPost: postId => noAuthInstance.get(apiByPathVariable(COMMENT_API, postId)),
  // 댓글 등록
  register: (postId, { comment }) =>
    authInstance.post(apiByPathVariable(COMMENT_API, postId), { comment }),
  // 댓글 업데이트
  updateById: (commentId, { comment }) =>
    authInstance.put(apiByPathVariable(COMMENT_API, commentId), { comment }),
  // 댓글 삭제
  deleteById: commentId => authInstance.delete(apiByPathVariable(COMMENT_API, commentId)),
};

export default commentApi;
