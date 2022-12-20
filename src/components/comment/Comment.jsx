// import React, { memo, useState } from 'react';
// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Label from '../common/Label';
import DivideLine from '../common/DivideLine';

const Comment = () => {
  // console.log(comment);
  // console.log(user);
  return (
    <div>
      <TopWrap>
        <UserWrap>
          <span>image</span>
          <Label>nickname</Label>
          <Label>|</Label>
          <Label>date</Label>
        </UserWrap>
        <ButtonWrap>
          <Button>수정하기</Button>
          <Button>삭제하기</Button>
        </ButtonWrap>
      </TopWrap>
      <CommentBox>comment</CommentBox>
      <DivideLine />
    </div>
  );
};
const UserWrap = styled.div`
  display: flex;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const Button = styled.div`
  font-size: small;
  text-decoration: underline;
  color: #6d7d8b;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentBox = styled.div`
  height: 100px;
  margin: 10px 0px 20px 0px;
`;

// const Comment = memo(({comment, user}}) => {
//   const dispatch = useDispatch();
//   const [toggle, setToggle] = useState(false);
//   const [value, setValue] = useState("");

//   let date = String(new Date(id)).replace('GMT+0900 (한국 표준시)', '');

//   if (editHistory) {
//     date = String(new Date(editHistory)).replace('GMT+0900 (한국 표준시)', '(수정)');
//   }

//   const handleToggle = () => {
//     setToggle(prev => !prev);
//   };

//   const editComment = e => {
//     e.preventDefault();
//     if (newContent === content) {
//       return alert('변경된 내용이 없습니다.');
//     }
//     dispatch(__editComment({ id, newContent, editHistory: Date.now() }));
//     handleToggle();
//   };

//   const deleteComment = e => {
//     e.preventDefault();
//     if (window.confirm('정말 삭제하시겠습니까?')) {
//       dispatch(__deleteComment(id));
//     }
//   };

//   if (!toggle)
//     return (
//       <CommentWrapper>
//         <span>{newContent}</span>
//         <div>
//           <DateSpan>{date}</DateSpan>
//           <Button
//             type="button"
//             onClick={e => {
//               e.preventDefault();
//               handleToggle();
//             }}
//           >
//             ✏
//           </Button>
//           <Button type="button" onClick={deleteComment}>
//             🗑️
//           </Button>
//         </div>
//       </CommentWrapper>
//     );
//   else
//     return (
//       <CommentWrapper onSubmit={editComment}>
//         <Input
//           id="editInput"
//           type="text"
//           value={newContent}
//           onChange={onChange}
//           autoFocus
//           required
//         />
//         <div>
//           <Button>✔</Button>
//           <Button
//             type="button"
//             onClick={e => {
//               e.preventDefault();
//               handleToggle();
//               reset();
//             }}
//           >
//             ❌
//           </Button>
//         </div>
//       </CommentWrapper>
//     );
// });

export default Comment;
