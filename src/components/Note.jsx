import React, { useContext, useEffect, useRef } from 'react';
import { NoteContext } from '../context/NoteContext';
import SavingLoader from './SavingLoader';
import NoteHeader from './NoteHeader';
import Editor from './Editor';

function Note({ note }) {
  const { id, content, zIndex, background, position } = note;
  const { editHandler, updateZIndex } = useContext(NoteContext);
  const editorRef = useRef();
  useEffect(() => focusRef(), []);

  const focusRef = () => {
    editorRef.current.focus();
  };

  return (
    <>
      <div className='note-container' style={{ ...position, zIndex }}>
        <NoteHeader background={background} id={id} focusRef={focusRef} />
        <Editor
          id={id}
          content={content}
          editHandler={editHandler}
          ref={editorRef}
          updateZIndex={() => updateZIndex(id)}
        />
      </div>
    </>
  );
}

export default Note;
