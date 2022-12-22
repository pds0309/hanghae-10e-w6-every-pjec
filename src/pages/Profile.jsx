import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  __editMyNickname,
  __getMyProfile,
  __editMyStack,
  __deleteAccount,
  changeProfile,
} from '../redux/modules/UserSlice';
import userApi from '../apis/userApi';

import useInput from '../hooks/useInput';
import { USER_VALIDATION } from '../constants/validation';
import Selection from '../components/common/Selection';
import { STACK_OPTIONS } from '../constants/postOptions';

import styled from 'styled-components';
import { Colors } from '../styles';
import ProfileImage from '../components/common/ProfileImage';
import Button from '../components/common/Button';
import Label from '../components/common/Label';
import TwinInputBox from '../components/common/TwinInputBox';
import DivideLine from '../components/common/DivideLine';
import ValidationText from '../components/common/ValidationText';
import Input from '../components/common/Input';
import imageApi from '../apis/imaegApi';

const genOptionByParam = param => {
  return param ? { value: param, label: param } : '';
};

const Profile = (size = { size }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogined } = useSelector(state => state.user);
  const imageUploadRef = useRef();
  useEffect(() => {
    dispatch(__getMyProfile);
  }, []);

  const [nicknameEditToggle, setNicknameEditToggle] = useState(false);
  const [nickname, nicknameValidation, handleChangeNickname, resetInput] = useInput(
    user?.nickname,
    USER_VALIDATION.NICKNAME,
  );
  const [nicknameDuplicated, setNicknameDuplicated] = useState({
    status: false,
    message: '',
  });
  const [currentProfileImage, setCurrentProfileImage] = useState(user?.image);
  useEffect(() => {
    setNicknameDuplicated({
      status: false,
      message: '',
    });
  }, [nickname]);

  const handleNicknameToggle = () => {
    setNicknameEditToggle(prev => !prev);
    resetInput();
  };

  const handleBlurNickname = () => {
    if (!nicknameValidation.isInputValidated) {
      return;
    }

    if (nickname === user.nickname) {
      return setNicknameDuplicated({ status: false, message: '새로운 닉네임을 입력해주세요' });
    }

    userApi
      .validateNickname(nickname)
      .then(res => setNicknameDuplicated({ status: true, message: res.data.message }))
      .catch(err => setNicknameDuplicated({ status: false, message: err.errorMessage }));
  };

  const editNickname = () => {
    if (nicknameValidation.isInputValidated && nicknameDuplicated.status) {
      dispatch(__editMyNickname({ nickname }));
      handleNicknameToggle();
    }
  };

  const [stackEditToggle, setStackEditToggle] = useState(false);

  const [stack, setStack] = useState(
    user?.stack ? user.stack.split(',').map(st => genOptionByParam(st)) : [],
  );

  const handleStackToggle = () => {
    setStackEditToggle(prev => !prev);
  };

  const editStack = () => {
    const newStack = stack.map(st => st.value).join(',');
    dispatch(__editMyStack({ newStack }));
    handleStackToggle();
  };

  const deleteAccount = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      dispatch(__deleteAccount());
      navigate('/');
    }
  };

  const handleOpenProfileUploadClick = () => {
    imageUploadRef.current.click();
  };

  const handleImageUpload = ({ target }) => {
    const uploadedFile = target?.files?.[0];
    if (!uploadedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('category', 'PROFILE');
    formData.append('uploader', user.userId);
    imageApi
      .uploadProfile(formData)
      .then(response => {
        const path = process.env.REACT_APP_IMAGE_ENDPOINT + response.data.imagePath;
        setCurrentProfileImage(path);
        userApi
          .editProfile({ image: path })
          .then(() => dispatch(changeProfile(path)))
          .catch(() => alert('프로필 등록 실패'));
      })
      .catch(err => alert(err?.message ?? '프로필 등록 실패'));
  };

  return (
    <Warp>
      {isLogined && user && (
        <>
          <Title>내 프로필</Title>
          <SectionWrap>
            <ImageWrap>
              <ProfileImage size={200} imageUrl={currentProfileImage} />
              <ButtonWrap>
                <Button
                  style={{ height: '40px', width: '200px' }}
                  onClick={handleOpenProfileUploadClick}
                >
                  프로필 변경
                </Button>
                <div style={{ height: '0px', overflow: 'hidden' }}>
                  <input
                    ref={imageUploadRef}
                    type="file"
                    name="fileInput"
                    onChange={handleImageUpload}
                  />
                </div>
              </ButtonWrap>
            </ImageWrap>
            <InfoWrap>
              <h1 style={{ marginBottom: '0px' }}>{user.nickname}</h1>
              <InfoBox>
                <TwinInputBox
                  leftContent={<Label>로그인 ID</Label>}
                  rightContent={<Label>가입일</Label>}
                />
                <TwinInputBox
                  leftContent={<UpperContent>{user.loginId}</UpperContent>}
                  rightContent={<UpperContent>{user.createdAt}</UpperContent>}
                />
              </InfoBox>
            </InfoWrap>
          </SectionWrap>
          <LabelWrap>
            <Label>닉네임</Label>
            {!nicknameEditToggle ? (
              <EditButton onClick={handleNicknameToggle}>변경하기</EditButton>
            ) : (
              <>
                <EditButton onClick={editNickname}>변경하기</EditButton>
                <EditButton onClick={handleNicknameToggle}>변경취소</EditButton>
              </>
            )}
          </LabelWrap>
          {!nicknameEditToggle ? (
            <LowerContent>{user.nickname}</LowerContent>
          ) : (
            <>
              <Input
                value={nickname}
                onChange={handleChangeNickname}
                onBlur={handleBlurNickname}
                style={{ marginTop: '15px' }}
              />
              <ValidationText
                isValidationSuccess={
                  nicknameValidation.isInputValidated && nicknameDuplicated.status
                }
              >
                {!nicknameValidation.isInputValidated
                  ? nicknameValidation.message
                  : nicknameDuplicated.message || nicknameValidation.message}
              </ValidationText>
            </>
          )}
          <LabelWrap>
            <Label>기술스택</Label>
            {!stackEditToggle ? (
              <EditButton onClick={handleStackToggle}>변경하기</EditButton>
            ) : (
              <>
                <EditButton onClick={editStack}>변경하기</EditButton>
                <EditButton onClick={handleStackToggle}>변경취소</EditButton>
              </>
            )}
          </LabelWrap>
          {!stackEditToggle ? (
            <LowerContent>{user.stack?.replaceAll(',', ', ')}</LowerContent>
          ) : (
            <SelectWrap>
              <Selection
                options={STACK_OPTIONS}
                isMulti={true}
                setValue={setStack}
                initialValue={stack}
              />
            </SelectWrap>
          )}
          <br />
          <br />
          <DivideLine />
          <Label>회원탈퇴</Label>
          <Button
            onClick={deleteAccount}
            style={{ height: '40px', width: '200px', marginTop: '10px', marginBottom: '10px' }}
            btnColor={'warning'}
          >
            회원탈퇴
          </Button>
          <ValidationText isValidationSuccess={false}>
            탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
          </ValidationText>
        </>
      )}
    </Warp>
  );
};

export default Profile;

const Warp = styled.div`
  width: 900px;
  margin-left: 180px;
`;

const SectionWrap = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 45px;
  width: fit-content;
  margin-bottom: 50px;
`;

const ImageWrap = styled.div``;
const InfoWrap = styled.div`
  margin-left: 120px;
  padding-top: 32px;
`;

const InfoBox = styled.div`
  width: 700px;
`;

const UpperContent = styled.div`
  color: black;
  font-size: 18px;
  margin-left: 4.5px;
`;

const ButtonWrap = styled.div`
  position: relative;
  height: 120px;
  padding-top: 20px;
  display: flex;
`;

const LabelWrap = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  cursor: pointer;
  color: ${Colors.brand};
  text-decoration-line: underline;
  border: none;
  background-color: transparent;
  margin-top: 13px;
  margin-right: -15px;
  margin-left: 13px;
`;

const LowerContent = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: 6px;
`;

const SelectWrap = styled.div`
  margin-top: 10px;
`;
