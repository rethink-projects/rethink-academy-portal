import React, { useState } from "react";
import "../theme/colors.css";
import {
  NotificationContextType,
  NotificationContext,
} from "./NotificationContext";

import { toast } from "react-toastify";
import Toast from "../components/Toast/Toast";

export type ToastType = {
  id?: string;
  title?: string;
  dismissText?: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  createdAt?: any;
  simple?: Boolean;
  data?: {
    read?: Boolean;
    exclude?: Boolean;
  };
};

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ToastType[]>([]);

  enum ProgressColor {
    info = "#101242",
    success = "#082114",
    warning = "#472B09",
    error = "#430F11",
  }

  enum BackgroundColor {
    info = "#F3F3FC",
    success = "#F3FCF7",
    warning = "#FDF8F2",
    error = "#FCF3F3",
  }

  const notify = (toastData: ToastType) => {
    setNotifications([toastData, ...notifications]);
    toast(<Toast {...toastData} />, {
      position: "top-right",
      style: { backgroundColor: BackgroundColor[toastData.type!] },
      closeButton: false,
      icon: false,
      progressStyle: {
        backgroundColor: ProgressColor[toastData.type!],
        padding: 0,
        height: "3px",
      },
    });
  };

  let value: NotificationContextType = {
    notifications,
    notify,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
