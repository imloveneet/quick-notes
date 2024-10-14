import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const ColorComponent = () => {
  const { colors, selectedColor, updatedSelectColor } = useContext(NoteContext);
  return (
    <div className='color-component-container'>
      {colors.map((color) => (
        <div
          key={color.background}
          className={`color-component-color ${
            selectedColor === color.background ? 'color-selected' : ''
          }`}
          style={{ background: color.background }}
          onClick={() => updatedSelectColor(color.background)}
        ></div>
      ))}
    </div>
  );
};

export default ColorComponent;
