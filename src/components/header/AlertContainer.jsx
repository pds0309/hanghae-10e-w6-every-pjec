import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userNotificationApi from '../../apis/userNotificationApi';
import { confirmAlert, __getNotifications } from '../../redux/modules/NotificationSlice';
import { Colors } from '../../styles';
import { getFormattedDate } from '../../utils/dateHandler';
import AlertCounter from './AlertCounter';
import AlertIcon from './AlertIcon';
import SelectBox from './SelectBox';

const AlertContainer = ({ visible, onClose, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, notifications } = useSelector(state => state.notifications);
  useEffect(() => {
    dispatch(__getNotifications());
  }, []);
  if (error) {
    return (
      <Container>
        <AlertIcon onClick={onClick} />
        <SelectBox visible={visible} onClose={onClose} location={-10}>
          <DefaultSelectBoxContents>알림을 불러올 수 없습니다.</DefaultSelectBoxContents>
        </SelectBox>
      </Container>
    );
  }

  const handleNotificationBoxClick = async notification => {
    await userNotificationApi.confirmNotification(notification.alertId);
    navigate(`/postdetail/${notification.postId}`);
    dispatch(confirmAlert(notification.alertId));
  };

  return (
    <>
      {!isLoading && (
        <>
          <Container>
            {notifications.length !== 0 && <AlertCounter>{notifications.length}</AlertCounter>}
            <AlertIcon onClick={onClick} />
            <SelectBox visible={visible} onClose={onClose} location={-10} boxMarginTop={0}>
              {notifications.length !== 0 ? (
                notifications.map(noti => (
                  <SelectBoxContents key={noti.alertId}>
                    <div onClick={() => handleNotificationBoxClick(noti)}>
                      <p style={{ margin: '0' }}>{noti.message}</p>
                      <p
                        style={{
                          margin: '0',
                          textAlign: 'right',
                          fontSize: '12px',
                          color: Colors.grey,
                        }}
                      >
                        {getFormattedDate(noti.createdAt)}
                      </p>
                    </div>
                  </SelectBoxContents>
                ))
              ) : (
                <DefaultSelectBoxContents>
                  <div style={{ height: '30px', display: 'flex', justifyContent: 'center' }}>
                    읽지 않은 알림이.. 없습니다!!
                  </div>
                </DefaultSelectBoxContents>
              )}
            </SelectBox>
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  margin-right: -10px;
  position: relative;
`;

const DefaultSelectBoxContents = styled.div`
  padding: 16px;
  width: 300px;
`;

const SelectBoxContents = styled(DefaultSelectBoxContents)`
  :hover {
    background-color: rgba(232, 196, 196, 0.3);
  }
  cursor: pointer;
`;

export default AlertContainer;
