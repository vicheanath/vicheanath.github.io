import Cursor from "./Cursor";
import Icon from "./Icon";
import { useEffect, useRef } from "react";

// Knowing width and height ahead of time improves performance
// because we can skip calling `element.getBoundingClientRect()`
const WIDTH = 40;
const HEIGHT = 40;

export const MouseCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    // Enclose ref value under the current scope.
    const api = ref.current;
    if (api) {
      const handleMouseMove = (event) => {
        // Call api to move the element based on mouse coordinates
        api.moveTo(event.clientX, event.clientY);
      };
      // Listen for mouse movement throught the whole document.
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        // Cancel listener when component unmounts
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <Cursor ref={ref} width={WIDTH} height={HEIGHT}>
      <Icon width={WIDTH} height={HEIGHT} />
    </Cursor>
  );
};
