import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import styles from './editor.module.css';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import 'react-quill/dist/quill.snow.css';
import MagicUrl from 'quill-magic-url';
import imageApi from '../../apis/imaegApi';

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 1rem;
    min-height: 480px;
    font-size: 16px;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 1rem;
  }
`;

const Editor = ({ content, onChangeField, userId }) => {
  const quillElement = useRef('');
  const quillInstance = useRef('');

  const imageHandler = useCallback(async () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();
    fileInput.addEventListener('change', async function () {
      const formData = new FormData();
      const file = fileInput.files[0];
      formData.append('image', file);
      formData.append('uploader', userId);
      formData.append('category', 'COMMUNITY_POST');
      const response = await imageApi.uploadPost(formData);
      const quill = quillInstance.current;
      let index = (quill.getSelection() || {}).index;
      if (index === undefined || index < 0) index = quill.getLength();
      quill.insertEmbed(
        index,
        'image',
        process.env.REACT_APP_IMAGE_ENDPOINT + response.data.imagePath,
        'user',
      );
      quill.setSelection(quill.getSelection().index + 1, 0);
    });
  }, []);

  useEffect(() => {
    Quill.register('modules/magicUrl', MagicUrl);
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        imageDropAndPaste: {
          handler: imageHandler,
        },

        magicUrl: true,
      },
      placeholder: `내용을 입력하세요`,
      readOnly: false,
      theme: 'snow',
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'content', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField, imageHandler]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = content;
  }, [content]);

  return (
    <section className={styles.editorWrapper}>
      <QuillWrapper>
        <div className={styles.quillEditor} ref={quillElement} />
      </QuillWrapper>
    </section>
  );
};
export default Editor;
