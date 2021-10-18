/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import tw from 'twin.macro';

import { Tooltip } from '@rmwc/tooltip';
import { ReactElement } from 'react';

interface IProps {
  text: string;
  children: ReactElement;
  enterDelay?: number;
  leaveDelay?: number;
  hidden?: boolean;
  arrow?: boolean;
  disabled?: boolean;
  fontSize?: number;
  [type: string]: any;
}

export const Hint = ({
  text,
  enterDelay = 1000,
  leaveDelay = 300,
  arrow = false,
  disabled = false,
  fontSize = 1,
  ...props
}: IProps) => {
  return disabled ? (
    <>{props.children}</>
  ) : (
    <Tooltip
      className="hint-tooltip-container"
      content={text}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      showArrow={arrow}
      activateOn="hover"
      css={customTooltipStyles(fontSize)}
      {...props}
    >
      {props.children}
    </Tooltip>
  );
};

const customTooltipStyles = (fontSize: number = 1) => css`
  font-size: ${String(fontSize)}rem !important;
  
  .rmwc-tooltip-arrow {
    border-top-color: #6a6b73;
  }
`;
