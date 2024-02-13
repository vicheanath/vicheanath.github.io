import Cursor from "./Cursor";
import Icon from "./Icon";
import { useCallback, useRef } from "react";

// Knowing width and height ahead of time improves performance
// because we can skip calling `element.getBoundingClientRect()`
const WIDTH = 40;
const HEIGHT = 40;

const styles = {
  width: "500px",
  height: "500px",
};

/**
 * Same thing but movement is restricted to a specific area.
 */
export const MouseCursorWithBounds = () => {
  const ref = useRef(null);

  const handleMouseMove = useCallback((event) => {
    const api = ref.current;
    if (api) {
      // Call api to move the element based on mouse coordinates
      api.moveTo(event.clientX, event.clientY);
    }
  }, []);

  return (
    <div style={styles} onMouseMove={handleMouseMove}>
      <Cursor ref={ref} width={WIDTH} height={HEIGHT}>
        <Icon width={WIDTH} height={HEIGHT} />
      </Cursor>
    </div>
  );
};
