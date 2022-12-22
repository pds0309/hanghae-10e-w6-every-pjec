import { authInstance } from './instance';
import { apiByPathVariable } from './utils';

const USER_NOTI_API = '/user/alert';

const userNotificationApi = {
  // 알림 목록 조회
  getNotifications: () => authInstance.get(USER_NOTI_API),
  // 알림 확인 시 삭제
  confirmNotification: alertId => authInstance.delete(apiByPathVariable(USER_NOTI_API, alertId)),
};

export default userNotificationApi;
