import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import App from "../../App";
import { DatePicker } from "../../components/DatePicker/DatePicker";
// import styles from "./Playground.module.css";
import Toast, { toastConfig } from "../../components/Toast/Toast";
import NotificationProvider from "../../context/NotificationProvider";

function PlaygroundScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  return (
    <div>
      {/* <Toast
        title="Parabéns! Seu curso foi adicionado com Sucesso!"
        type="success"
        dismissText="Dismiss"
      /> */}
      <ToastContainer
        style={{ minWidth: toastConfig.minWidth }}
        theme={toastConfig.theme}
      />
      <NotificationProvider>
        <App />
      </NotificationProvider>
      {/* <DatePicker size={"large"} calendarPosition={"left"} placeholder={""} /> */}
      {/* <CardAddCourse title="Adicionar um Curso" /> */}
    </div>
  );
}

export default PlaygroundScreen;
