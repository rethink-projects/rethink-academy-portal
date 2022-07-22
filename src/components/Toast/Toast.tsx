import {
  CheckCircleOutlineOutlined,
  WarningAmberRounded,
  CloseOutlined,
  ErrorOutline,
} from "@mui/icons-material";
import { ToastType } from "../../context/NotificationProvider";
import styles from "./Toast.module.css";

export const toastConfig = {
  minWidth: "500px",
  theme: "colored",
} as const;

enum IconColor {
  info = "#191E6C",
  success = "#0E3E26",
  warning = "#B26B1A",
  error = "#6C191D",
}

function Toast({
  title,
  description,
  simple = false,
  type = "info",
  dismissText = "Dismiss",
}: ToastType) {
  let Icon = {
    info: <div />,
    success: <CheckCircleOutlineOutlined sx={{ color: IconColor.success }} />,
    warning: <WarningAmberRounded sx={{ color: IconColor.warning }} />,
    error: <ErrorOutline sx={{ color: IconColor.error }} />,
    simple: <CloseOutlined sx={{ color: IconColor[type] }} fontSize='small' />,
  };

  return (
    <div className={styles["toast_container_" + type]}>
      <div className={styles["toast_header_" + type]}>
        <div className={styles.toast_container_inner}>
          {Icon[type]}
          <p className={styles["toast_title_" + type]}>{title}</p>
        </div>
        <div className={styles.toast_container_inner_dismiss}>
          {simple ? (
            Icon.simple
          ) : (
            <p className={styles["toast_dismiss_" + type]}>{dismissText}</p>
          )}
        </div>
      </div>
      {description && (
        <>
          <div className={styles["toast_divider_" + type]} />
          <div className={styles.toast_footer}>
            <p className={styles["toast_description_" + type]}>{description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Toast;
