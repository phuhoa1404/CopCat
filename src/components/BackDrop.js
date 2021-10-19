import React from 'react';

export const Backdrop = (props) =>
  props.show ? (
    <div
      className="Backdrop"
      style={{ zIndex: `${props.disable ? '101' : '100'}` }}
      onClick={props.clicked}
    >
      {props.children}
    </div>
  ) : null;
