import { useEffect, useState } from "react";

import style from "./PrivacyToggle.module.css";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

type setVisibility = {
  getVisibility: (params: any) => any;
  setVisibility: boolean | undefined;
};

const PrivacyToggle = (props: setVisibility) => {
  const [isPublic, setIsPublic] = useState(props.setVisibility);

  useEffect(() => {
    setIsPublic(props.setVisibility);
  }, [props.setVisibility]);

  const setPublic = () => {
    setIsPublic((current) => !current);
    props.getVisibility(!isPublic);
  };

  return (
    <div className={style.toggleContainer}>
      <button onClick={setPublic} className={!isPublic ? style.active : ""}>
        <LockOutlinedIcon />
        Privado
      </button>
      <button onClick={setPublic} className={isPublic ? style.active : ""}>
        <PublicOutlinedIcon />
        Público
      </button>
    </div>
  );
};

export default PrivacyToggle;
