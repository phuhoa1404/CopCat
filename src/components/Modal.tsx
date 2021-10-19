import React from 'react';
import { useKeyPressEvent } from 'react-use';
import { Backdrop } from './BackDrop';

export enum Keys {
    ENTER = 'Enter',
    ESC = 'Escape',
    SPACE = 'Space'
  }

interface IProps {
    show: boolean;
    modalClosed?: () => unknown;
    disablebackdrop?: boolean;
    top?: string;
    children: any;
    classes?: string;
    preventEsc?: boolean;
  }
  
export const Modal = (props: IProps) => {
useKeyPressEvent(Keys.ESC, () => {
    if (props?.preventEsc === true) return;

    if (props.show) {
    props?.modalClosed?.();
    }
});

return (
    <Backdrop show={props.show} disable={props?.disablebackdrop ?? false}>
    <div
        className={`Modal ${props?.classes || ''}`}
        style={{
        zIndex: 999999,
        // transform: props.show ? 'translateY(0)' : 'translateY(-200vh)',
        top: props.show ? (props?.top || '5vh') : '-100vh',
        // opacity: props.show ? '1' : '0'
        }}
    >
        <>
        <span onClick={props.modalClosed} className="customClose">
            &times;
        </span>
        {props.children}
        </>
    </div>
    </Backdrop>
);
};