import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bookmarkApi from '../../apis/bookmarkApi';
import {
  clearError,
  initDeleteSuccess,
  initUpdateSuccess,
  __deletePostById,
  __getPostById,
} from '../../redux/modules/PostSlice';
import { getFormattedDate } from '../../utils/dateHandler';
import DivideLine from '../common/DivideLine';
import ProfileImage from '../common/ProfileImage';
import TwinInfoBox from '../common/TwinInfoBox';
import PostSection from '../layouts/PostSection';
import PostBasicInfo from './PostBasicInfo';

const PostThread = ({ postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { post, isLoading, error, deleteSuccess } = useSelector(state => state.posts);
  const [isLogined, setIsLogined] = useState(false);
  const [bookmarkToggle, setBookmarkToggle] = useState(false);

  useEffect(() => {
    user &&
      bookmarkApi.getBookmark(user?.userId).then(res => {
        const data = res.data.data.filter(pick => pick.postId === post.postId);
        console.log(data);
        data.length ? setBookmarkToggle(true) : setBookmarkToggle(false);
      });
  }, [postId]);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogined');
    if (loginStatus === 'true') setIsLogined(true);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initDeleteSuccess());
      dispatch(initUpdateSuccess());
    };
  }, []);

  useEffect(() => {
    dispatch(__getPostById({ postId }));
  }, [dispatch, postId]);

  useEffect(() => {
    if (error) {
      return () => dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      alert('삭제 완료!');
      navigate('/');
      return;
    }
    error && alert(error.message);
  }, [deleteSuccess]);

  const handlePostDeleteLink = () => {
    if (confirm('정말 삭제하시겠어요?')) {
      dispatch(__deletePostById({ postId }));
    }
  };

  const handleBookmarkToggle = () => {
    setBookmarkToggle(prev => !prev);
  };

  const createBookmark = () => {
    bookmarkApi.createBookmark(post.postId).then(res => console.log(res.data.message));
    handleBookmarkToggle();
  };

  const deleteBookmark = () => {
    bookmarkApi.deleteBookmark(post.postId).then(res => console.log(res.data.message));
    handleBookmarkToggle();
  };

  if (isLoading) {
    return (
      <PostSection>
        <StatusContainer>
          <h3>...loading</h3>
        </StatusContainer>
      </PostSection>
    );
  }
  if (error) {
    return (
      <PostSection>
        <StatusContainer>
          <h3>{error.message}</h3>
        </StatusContainer>
      </PostSection>
    );
  }

  return (
    <PostSection>
      {post && (
        <>
          <TitleWrap>
            {post.title}
            {isLogined &&
              user?.userId !== post.userId &&
              (!bookmarkToggle ? (
                <Bookmark
                  onClick={createBookmark}
                  src="https://cdn-icons-png.flaticon.com/512/4218/4218997.png"
                />
              ) : (
                <Bookmark
                  onClick={deleteBookmark}
                  src="https://cdn-icons-png.flaticon.com/512/4219/4219000.png"
                />
              ))}
          </TitleWrap>
          <WriteInfoContainer>
            <WriterBox>
              <ProfileImage imageUrl={post.image} />
              <TwinInfoBox
                leftContent={post.nickname}
                rightContent={getFormattedDate(post.createdAt)}
                style={{ marginBottom: '-6px' }}
              />
            </WriterBox>
            <WriterBox>
              {user && user.userId === post.userId && (
                <>
                  {/* TODO: 수정 페이지로 이동 */}
                  <Link to={'/postupdate/' + postId}>수정하기</Link>
                  <Link to="" onClick={handlePostDeleteLink}>
                    삭제하기
                  </Link>
                </>
              )}
            </WriterBox>
          </WriteInfoContainer>
          <DivideLine />
          <PostBasicInfoContainer>
            <PostBasicInfo labelName="모집정보">
              <>
                {post.division}&nbsp;{post.onoff}
              </>
            </PostBasicInfo>
            <PostBasicInfo labelName="모집인원">{post.recruitNum ?? '미정'}</PostBasicInfo>
            <PostBasicInfo labelName="시작 예정일">
              {getFormattedDate(post.startDate).split(' ')[0] ?? '미정'}
            </PostBasicInfo>
            <PostBasicInfo labelName="기간">{post.period ?? '미정'}</PostBasicInfo>
          </PostBasicInfoContainer>
          <PostBasicInfoContainer>
            <PostBasicInfo labelName="기술스택" width={600}>
              {post.stack?.split(',').map(st => st + ' ')}
            </PostBasicInfo>
          </PostBasicInfoContainer>
          <PostBasicInfoContainer>
            <PostBasicInfo labelName="연락처">{post.contact ?? '미정'}</PostBasicInfo>
          </PostBasicInfoContainer>
          <h2 style={{ marginBottom: '0px' }}>모집상세내용</h2>
          <DivideLine />
          <div style={{ minHeight: '300px' }}>
            <p style={{ lineHeight: '180%' }}>{post.content}</p>
          </div>
        </>
      )}
    </PostSection>
  );
};

const WriteInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrap = styled.h1`
  display: flex;
  justify-content: space-between;
`;

const Bookmark = styled.img`
  width: 50px;
  height: 50px;
`;
const WriterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  grid-column-gap: 12px;
`;

const PostBasicInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  width: 700px;
  grid-column-gap: 30px;
`;

const StatusContainer = styled.div`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default PostThread;
