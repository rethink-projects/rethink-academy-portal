import React, { useState } from "react";
import styles from "./Tooltip.module.css";

const Tooltip = (props: any) => {
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={styles.tooltip_wrapper}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div
          className={[
            styles.tooltip_tip,
            styles["tooltip_tip_" + props.direction],
          ].join(" ")}
        >
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
