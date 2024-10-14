import React, { useContext, useEffect, useRef } from 'react';
import IconButton from './IconButton';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { NoteContext } from '../context/NoteContext';

const NoteHeader = ({ id, background, focusRef }) => {
  const {
    addNote,
    deleteNote,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
  } = useContext(NoteContext);

  const mouseHandler = (id) => {
    focusRef();
    mouseUpHandler(id);
  };

  return (
    <div
      className='note-header'
      onMouseDown={(e) => mouseDownHandler(id, e)}
      onMouseMove={(e) => mouseMoveHandler(id, e)}
      onMouseUp={() => mouseHandler(id)}
      style={{ background }}
    >
      <div className='note-header-left'>
        <IconButton classes={'add-note'} icon={FaPlus} onClick={addNote} />
      </div>
      <div className='note-header-right'>
        <IconButton
          classes={'delete-note'}
          icon={FaTrash}
          onClick={() => deleteNote(id)}
        />
      </div>
    </div>
  );
};

export default NoteHeader;
