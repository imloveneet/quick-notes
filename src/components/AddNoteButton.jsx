import React, { useContext } from 'react';
import ColorComponent from './ColorComponent';
import IconButton from './IconButton';
import { FaPlus } from 'react-icons/fa';
import { NoteContext } from '../context/NoteContext';

function AddNoteButton() {
  const { addNote } = useContext(NoteContext);
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
      }}
    >
      <ColorComponent />
      <IconButton classes='add-note' icon={FaPlus} onClick={addNote} />
    </div>
  );
}

export default AddNoteButton;
