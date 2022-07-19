import React from "react";
import styles from "./Playground.module.css";
import { useNotification } from "../../context/NotificationContext";
import {
  WarningAmberOutlined,
  CheckCircleOutlineOutlined,
  ErrorOutlineOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import IconButton from "../../components/IconButton/IconButton";

function PlaygroundScreen() {
  const { notifications, notify } = useNotification();
  console.log({ notifications });
  return (
    <div className={styles.playground_container}>
      <div className={styles.playground_container_inner}>
        <IconButton
          onClick={() => {
            notify({
              type: "success",
              title: "This is a success message",
              simple: false,
              // description:
              //   "This is a sub message to explain the title if needed ",
            });
          }}
        >
          <CheckCircleOutlineOutlined />
        </IconButton>
        <span>{notifications.filter((n) => n.type === "success").length}</span>
      </div>
      <div className={styles.playground_container_inner}>
        <IconButton
          onClick={() => {
            notify({
              type: "warning",
              title: "This is a warning message",
              simple: true,
              description:
                "This is a sub message to explain the title if needed ",
            });
          }}
        >
          <WarningAmberOutlined />
        </IconButton>
        <span>{notifications.filter((n) => n.type === "warning").length}</span>
      </div>
      <div className={styles.playground_container_inner}>
        <IconButton
          onClick={() => {
            notify({
              type: "error",
              title: "This is a error message",
              simple: true,
              description:
                "This is a sub message to explain the title if needed This is a sub message to explain the title if needed This is a sub message to explain the title if needed This is a sub message to explain the title if needed",
            });
          }}
        >
          <ErrorOutlineOutlined />
        </IconButton>
        <span>{notifications.filter((n) => n.type === "error").length}</span>
      </div>
      <div className={styles.playground_container_inner}>
        <IconButton
          onClick={() => {
            notify({
              type: "info",
              title: "This is a info message",
              simple: false,
              description:
                "This is a sub message to explain the title if needed ",
            });
          }}
        >
          <InfoOutlined />
        </IconButton>
        <span>{notifications.filter((n) => n.type === "info").length}</span>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
