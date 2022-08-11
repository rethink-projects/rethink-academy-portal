import { useState } from "react";

import style from "./Switch.module.css";

type SwitchProps = {
  itemLeft: itemLeftProps;
  itemRight: itemRightProps;
};

type itemLeftProps = {
  title: string;
  icon: JSX.Element;
};

type itemRightProps = {
  title: string;
  icon: JSX.Element;
};

const Switch = ({ itemRight, itemLeft }: SwitchProps) => {
  const [isRight, setIsRight] = useState(true);
  const [isLeft, setIsLeft] = useState(false);

  const setRight = () => {
    setIsRight(true);
    setIsLeft(false);
  };

  const setLeft = () => {
    setIsRight(false);
    setIsLeft(true);
  };

  return (
    <div className={style.toggleContainer}>
      <button onClick={setLeft} className={isLeft ? style.active : ""}>
        {itemLeft.icon}
        {itemLeft.title}
      </button>
      <button onClick={setRight} className={isRight ? style.active : ""}>
        {itemRight.icon}
        {itemRight.title}
      </button>
    </div>
  );
};

export default Switch;
