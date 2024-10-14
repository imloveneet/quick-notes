import React from 'react';

const IconButton = ({
  style = {},
  classes = 'icon-btn',
  icon,
  onClick = () => {},
}) => {
  const Icon = icon;
  return (
    <button className={classes} style={style} onClick={onClick}>
      <Icon />
    </button>
  );
};

export default IconButton;
