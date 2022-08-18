import React, { useState } from "react";
import ModalTrilhas from "../../components/ModalTrilhas/ModalTrilhas";
// import styles from "./Playground.module.css";
import styles from "../CoursesScreen/Components/CardAddCourse/CardAddCourse.module.css";
import CloseIcon from "@mui/icons-material/Close";
import InputText from "../../components/InputText/InputText";
import Dropdown from "../../components/Dropdown/Dropdown";
import Textarea from "../../components/Textarea/Textarea";
import CardAddCourse from "../CoursesScreen/Components/CardAddCourse/CardAddCourse";

function PlaygroundScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  return (
    <div>
      <CardAddCourse title="Adicionar um Curso" />
    </div>
  );
}

export default PlaygroundScreen;
