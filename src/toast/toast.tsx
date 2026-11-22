import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { FlatifyGeneralProps } from '../interfaces';
import { generalClasses } from '../classes';

export interface ToastProps
  extends FlatifyGeneralProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Calls `onClose` after `duration`. */
  autoClose?: boolean;
  /** Content of the component. */
  children?: React.ReactNode;
  /** Shows a close button, it calls `onClose`. */
  closeButton?: boolean;
  /**
   * Accessible label of the close button.
   * @default 'Close toast'
   */
  closeButtonLabel?: string;
  /**
   * Time before `onClose` when `autoClose` is set, in milliseconds.
   * @default 3000
   */
  duration?: number;
  /** Called by the close button and auto close. */
  onClose?: () => void;
  /** Shows or hides the toast. */
  show?: boolean;
  /** CSS `animation` value used to show it, like `my-show 0.3s ease`. */
  showAnimation?: string;
  /** CSS `animation` value used to hide it. */
  hideAnimation?: string;
  /**
   * `status` is polite, `alert` interrupts screen readers.
   * @default 'status'
   */
  type?: 'status' | 'alert';
  /**
   * Horizontal position.
   * @default 'center'
   */
  x?: 'left' | 'right' | 'center';
  /**
   * Vertical position.
   * @default 'bottom'
   */
  y?: 'top' | 'bottom';
}

const ToastWrapper = styled.div`
 ${({ showAnimation }: ToastProps) =>
   showAnimation ? `--flatify__toast-animation-show: ${showAnimation};` : ''}
  ${({ hideAnimation }: ToastProps) =>
    hideAnimation ? `--flatify__toast-animation-hide: ${hideAnimation};` : ''}
  ${({ sx }: ToastProps) => (sx ? sx : '')}
`;

export default function Toast(props: ToastProps) {
  const {
    autoClose,
    children,
    closeButton,
    closeButtonLabel = 'Close toast',
    duration = 3000,
    onClose,
    show,
    type,
    x = 'center',
    y = 'bottom',
    ...rest
  } = props;

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // emit onClose after the given duration
  useEffect(() => {
    if (!autoClose) return;
    closeTimeout.current && clearTimeout(closeTimeout.current);
    if (show) {
      closeTimeout.current = setTimeout(() => {
        onClose?.();
      }, duration);
    }
  }, [show, autoClose, duration, onClose]);

  // select the proper toasts wrapper element for ReactDOM portal
  const wrapperElement = document.querySelector(`.toast-wrapper.${x}.${y}`);
  if (!wrapperElement) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <CSSTransition
          in={show}
          timeout={200}
          unmountOnExit
          classNames={{
            exitActive: 'toast-will-be-removed',
          }}
        >
          <ToastWrapper
            {...rest}
            role={type}
            aria-live={type === 'alert' ? 'assertive' : 'polite'}
            aria-atomic="true"
            className={clsx('toast', ...generalClasses(props))}
          >
            {children}
            {closeButton && (
              <button
                onClick={onClose}
                type="button"
                className="close-button"
                aria-label={closeButtonLabel}
              />
            )}
          </ToastWrapper>
        </CSSTransition>,
        wrapperElement
      )}
    </>
  );
}
