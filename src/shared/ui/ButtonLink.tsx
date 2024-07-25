import { forwardRef, MouseEvent as ReactMouseEvent, useCallback } from 'react';
import { Button, ButtonProps } from 'antd';
import { NavigateProps, resolvePath, useNavigate } from 'react-router-dom';

type Props = ButtonProps & Partial<NavigateProps>;

export const ButtonLink = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ to, replace, state, relative, ...props }, ref) => {
    const navigate = useNavigate();

    const onClick = useCallback(
      (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
        if (to) {
          e.preventDefault();
          navigate(to, { replace, state, relative });
        }
        props.onClick?.(e);
      },
      [navigate, props.onClick, relative, replace, state, to],
    );

    return (
      <Button
        {...props}
        href={to ? resolvePath(to).pathname : props.href}
        onClick={onClick}
        ref={ref}
      ></Button>
    );
  },
);
