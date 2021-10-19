import React, { ReactElement } from 'react';
import './notification.scss';

interface IProps {
  type:
    | 'notification'
    | 'left'
    | 'warning'
    | 'information'
    | 'popup-manage-user'
    | 'error'
    | any
    | null;
  message: string | ReactElement;
  close?: (name?: string) => unknown;
  name?: string;
  direction?: string | null;
  customStyle?: object | null;
  hideCloseButton?: boolean;
}

export const Notification = ({
  type,
  message,
  close,
  name,
  direction,
  customStyle,
  hideCloseButton,
}: IProps) => {
  return type && message ? (
    <div
      className={`notificationWrapper ${type ? type : ''} ${
        direction ? direction : ''
      }`}
      style={customStyle ?? {}}
    >
      <div className="notification">
        {direction === 'left' ? (
          <>
            {!hideCloseButton && (
              <div
                className="closeButton"
                onClick={() => {
                  close?.(name);
                }}
              >
                X
              </div>
            )}
            <div className="message">{message}</div>
          </>
        ) : (
          <>
            <div className="message">{message}</div>
            {!hideCloseButton && (
              <div
                className="closeButton"
                onClick={() => {
                  close?.(name);
                }}
              >
                X
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ) : null;
};
