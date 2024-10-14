import React, { forwardRef } from 'react';

const Editor = forwardRef(({ id, content, editHandler, updateZIndex }, ref) => (
  <textarea
    className='editor'
    ref={ref}
    value={content}
    onClick={updateZIndex}
    onChange={(e) => editHandler(id, e.target.value)}
    placeholder='Write Something Here...'
  />
));

export default Editor;
