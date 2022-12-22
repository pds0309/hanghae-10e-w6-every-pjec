import React from 'react';
import Editor from './editor';

const EditorContainer = ({ value, onChange, userId }) => {
  return <Editor onChangeField={onChange} content={value} userId={userId}></Editor>;
};

export default React.memo(EditorContainer);
