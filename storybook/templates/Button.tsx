import React, { MouseEventHandler } from 'react';

export type Props = {
  /**
   * Button content
   */
  text?: string;

  /**
   * Should the button listen to click events
   */
  disabled?: boolean;

  /**
   * Optional handler for when the button is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * Your basic button
 */
export function Button({ disabled, text, onClick, ...props }: Props) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} {...props}>
      {text}
    </button>
  );
}
