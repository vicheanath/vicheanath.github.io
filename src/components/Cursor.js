import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
const styles = {
  position: "absolute",
  top: "-1000px",
  left: "-1000px",
};

const Cursor = forwardRef((props, ref) => {
  const { className, width, height, children } = props;
  const container = useRef(null);
  useImperativeHandle(ref, () => ({
    moveTo(x, y) {
      gsap.to(container.current, {
        x: x - width * 0.5,
        y: y - height * 0.5,
      });
    },
  }));
  return (
    <div style={styles} ref={container} className={className}>
      {children}
    </div>
  );
});

export default Cursor;