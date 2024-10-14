export const getMouseMovingPosition = (e, drag) => {
  const currentCursor = {
    x: e.clientX,
    y: e.clientY,
  };
  const distance = {
    x: currentCursor.x - drag.cursor.x,
    y: currentCursor.y - drag.cursor.y,
  };

  return {
    left: drag.note.x + distance.x,
    top: drag.note.y + distance.y,
  };
};

export const getMouseDownPosition = (e) => {
  return {
    cursor: {
      x: e.clientX,
      y: e.clientY,
    },
    note: {
      target: e.target,
      x: e.target.getBoundingClientRect().left,
      y: e.target.getBoundingClientRect().top,
    },
  };
};

export function getMaxIndex(notes) {
  return notes.reduce(function (prev, { zIndex }) {
    return prev > zIndex ? prev : zIndex;
  }, 0);
}

export function debounce(cb, setLoading, delay = 1000) {
  let timer;
  setLoading(true);
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
      setLoading(false);
    }, delay);
  };
}
