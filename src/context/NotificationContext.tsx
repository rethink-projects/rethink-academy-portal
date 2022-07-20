import { createContext, useContext } from "react";
import { ToastType } from "./NotificationProvider";

export interface NotificationContextType {
  notifications: ToastType[];
  notify: (toastData: ToastType) => void;
}

const NotificationContext = createContext<NotificationContextType>(null!);
NotificationContext.displayName = "Notifications Center";

function useNotification() {
  return useContext(NotificationContext);
}

export { NotificationContext, useNotification };
