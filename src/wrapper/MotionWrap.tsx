import React from "react";
import { motion } from "framer-motion";
import { JSX } from "react/jsx-runtime";

// Motion Wrap
const MotionWrap = (Component: JSX.IntrinsicAttributes, classNames: string) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={`${classNames} app__flex`}
      >
        {/* Component */}
        <Component />
      </motion.div>
    );
  };

export default MotionWrap;
