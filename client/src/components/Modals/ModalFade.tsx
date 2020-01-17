import React from "react";
import { useSpring, animated } from "react-spring";

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

export const ModalFade = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0, outline: "none" },
      to: { opacity: open ? 1 : 0, outline: "none" },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      }
    });
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  }
);
