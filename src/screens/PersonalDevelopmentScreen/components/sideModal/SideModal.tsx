import { useEffect, useRef, RefObject, useState } from "react";

import styles from "./SideModal.module.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { style } from "@mui/system";

import DropdownSideModal from "./DropdownSideModal/DropdownSideModal";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import Textarea from "../../../../components/Textarea/Textarea";

type modalProps = {
  onClose: VoidFunction;
  stundentEmail?: string;
};

export type GetUserType = {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  main: string;
  profile: any;
  note: any[];
  level: number;
  exp: number;
};

const SideModal = ({ onClose = () => {}, stundentEmail }: modalProps) => {
  const { user } = useAuth();
  const [userByEmail, setUserByEmail] = useState<GetUserType>();

  const [disabledConfirm, setDisabledConfirm] = useState(false);

  const getUser = async () => {
    try {
      const userData = await axios.get(
        `http://localhost:4000/api/user/${stundentEmail}`
      );
      setUserByEmail(userData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user, stundentEmail]);

  const disabledConfirmClass = disabledConfirm
    ? styles.modal_actions_confirm_disabled
    : "";

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "outside") {
      onClose();
    }
  };

  // parte para mostrar o onClick do confirm.
  const handleClickConfirm = () => {
    console.log(true);
  };

  if (!userByEmail) {
    return (
      <div
        id={"outside"}
        className={styles.modal_outside}
        onClick={handleOutsideClick}
      >
        <div className={styles.modal_container}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header_text}>
              <h1 className={styles.modal_header_title}>Suas metas</h1>
              <p className={styles.modal_header_description}>Carregando...</p>
            </div>
            <CloseRoundedIcon
              onClick={onClose}
              className={styles.modal_header_escape}
            />
          </div>
          <div className={styles.modal_down}>
            <DropdownSideModal />
          </div>
        </div>
      </div>
    );
  } else if (userByEmail.role === "STUDENT") {
    return (
      <div
        id={"outside"}
        className={styles.modal_outside}
        onClick={handleOutsideClick}
      >
        <div className={styles.modal_container}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header_text}>
              <h1 className={styles.modal_header_title}>Suas metas</h1>
              <p className={styles.modal_header_description}>
                Acompanhe suas metas{" "}
              </p>
            </div>
            <CloseRoundedIcon
              onClick={onClose}
              className={styles.modal_header_escape}
            />
          </div>
          <div className={styles.modal_down}>
            <DropdownSideModal />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        id={"outside"}
        className={styles.modal_outside}
        onClick={handleOutsideClick}
      >
        <div className={styles.modal_container}>
          <div className={styles.modal_header}>
            <div className={styles.modal_header_text}>
              <h1 className={styles.modal_header_title}>Suas metas</h1>
              <p className={styles.modal_header_description}>
                Acompanhe suas metas{" "}
              </p>
            </div>
            <CloseRoundedIcon
              onClick={onClose}
              className={styles.modal_header_escape}
            />
          </div>
          <div className={styles.modal_down}>
            <DropdownSideModal
              stundentEmail={stundentEmail}
              userRole={userByEmail!.role}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default SideModal;
