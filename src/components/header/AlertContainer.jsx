import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { __getNotifications } from '../../redux/modules/NotificationSlice';
import { Colors } from '../../styles';
import AlertCounter from './AlertCounter';
import AlertIcon from './AlertIcon';
import SelectBox from './SelectBox';

const AlertContainer = ({ visible, onClose, onClick }) => {
  const dispatch = useDispatch();
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
  return (
    <>
      {!isLoading && (
        <Container>
          <AlertCounter>{notifications.length || ' '}</AlertCounter>
          <AlertIcon onClick={onClick} />
          <SelectBox visible={visible} onClose={onClose} location={-10}>
            {notifications.length !== 0 ? (
              notifications.map((noti, i) => (
                <SelectBoxContents key={i}>
                  <p style={{ margin: 0 }}>{noti.message}</p>
                  <p
                    style={{ margin: 0, textAlign: 'right', fontSize: '12px', color: Colors.grey }}
                  >
                    날짜
                  </p>
                </SelectBoxContents>
              ))
            ) : (
              <DefaultSelectBoxContents>
                <div style={{ height: '300px' }}>읽지 않은 알림이.. 없습니다!!</div>
              </DefaultSelectBoxContents>
            )}
          </SelectBox>
        </Container>
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
