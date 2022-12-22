import { authInstance } from './instance';
import { apiByPathVariable } from './utils';

const BOOKMARK_API = '/picks';

const bookmarkApi = {
  // 북마크 생성
  createBookmark: postId => authInstance.post(apiByPathVariable(BOOKMARK_API, postId)),
  // 북마크 조회
  getBookmark: userId => authInstance.get(apiByPathVariable(BOOKMARK_API, userId)),
  // 북마크 삭제
  deleteBookmark: postId => authInstance.delete(apiByPathVariable(BOOKMARK_API, postId)),
};

export default bookmarkApi;
