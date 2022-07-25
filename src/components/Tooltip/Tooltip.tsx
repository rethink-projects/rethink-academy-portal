import React, { useState } from "react";
import styles from "./Tooltip.module.css";

type TooltipType = {
  children: JSX.Element;
  direction:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  content: string;
};

const Tooltip = ({ children, direction, content }: TooltipType) => {
  let timeout: any;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, timeout || 100);
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
      {children}
      {active && (
        <div
          className={[
            styles.tooltip_tip,
            styles["tooltip_tip_" + direction],
          ].join(" ")}
        >
          {/* Content */}
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
