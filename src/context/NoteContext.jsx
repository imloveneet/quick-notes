import { createContext, useEffect, useState } from 'react';
import {
  debounce,
  getMaxIndex,
  getMouseDownPosition,
  getMouseMovingPosition,
} from '../utils';

export const NoteContext = createContext();

const colors = [
  { background: '#001f3f' },
  { background: '#127070' },
  { background: '#119120' },
  { background: '#681270' },
  { background: '#701212' },
];
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(colors[0].background);
  const [drag, setDrag] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function keydownHandler(e) {
    if (e.altKey == true && e.keyCode == 78) addNote();
  }

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    getNotesFromStorage();

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  const getNotesFromStorage = () => {
    const oldNotes = localStorage.getItem('notes');

    if (oldNotes && JSON.parse(oldNotes)) {
      setNotes(JSON.parse(oldNotes));
    }
  };

  const setNotesToStorage = (allNotes) => {
    localStorage.setItem(
      'notes',
      JSON.stringify(allNotes.filter((note) => note.content))
    );
  };

  const addNote = () => {
    setNotes((prev) => {
      const maxIndex = getMaxIndex(prev);
      return [
        ...prev,
        {
          id: Math.floor(Math.random() * 1000000 + 2),
          content: '',
          zIndex: maxIndex + 1,
          background: selectedColor,
          position: {},
        },
      ];
    });
  };

  const deleteNote = (id) => {
    setNotes((prev) => {
      const filteredNotes = prev.filter((note) => note.id !== id);

      setNotesToStorage(filteredNotes);

      return filteredNotes;
    });
  };

  const updateZIndex = (id) => {
    setNotes((prev) => {
      const maxIndex = getMaxIndex(prev);

      return prev.map((note) =>
        note.id === id
          ? {
              ...note,
              zIndex: maxIndex === note.zIndex ? maxIndex : maxIndex + 1,
            }
          : { ...note }
      );
    });
  };

  const updatedSelectColor = (color) => {
    setSelectedColor(color);
  };

  const editHandler = (id, text) => {
    setNotes((prev) => {
      const updatedNotes = prev.map((note) =>
        note.id === id ? { ...note, content: text } : { ...note }
      );

      const fetchDebouncing = debounce(setNotesToStorage, setIsSaving);
      fetchDebouncing(updatedNotes);

      return updatedNotes;
    });
  };

  const mouseDownHandler = (id, e) => {
    updateZIndex(id);

    setDrag(getMouseDownPosition(e));
  };

  const mouseMoveHandler = (id, e) => {
    if (!drag) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, position: getMouseMovingPosition(e, drag) }
          : { ...note }
      )
    );
  };

  const mouseUpHandler = () => {
    if (drag) {
      setDrag(null);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        selectedColor,
        colors,
        drag,
        isSaving,
        addNote,
        editHandler,
        deleteNote,
        updateZIndex,
        updatedSelectColor,
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
