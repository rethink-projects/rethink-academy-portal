import React, { useState } from "react";

// assets
import Images from "../../assets";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// styles
import styles from "./AddTask.module.css";
import styled from "../AddTask/AddTaskForm.module.css";
import "../AddTask/AddTaskForm.css";

// components
import InputText from "../InputText/InputText";
import Dropdown from "../Dropdown/Dropdown";
import SimpleButton from "../SimpleButton/SimpleButton";
import Tag from "../Tag/Tag";
import DatePicker from "../DatePicker/DatePicker";
import { Times } from "./Times";
import Textarea from "../Textarea/Textarea";

type AddTaskProps = {
  formData: {
    taskName: string;
    date: string;
    startTime: string;
    endTime: string;
    tag: string;
    status: string;
    description: string;
  };
  setFormData: (value: any) => void;
};

function AddTask({}: AddTaskProps) {
  let iconImg = Images.arrowTask;
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    date: "",
    startTime: "",
    endTime: "",
    tag: "",
    status: "",
    description: "",
  });
  const handlerFormDataValues = (data: string, value: string) => {
    setFormData((prevValue: any) => ({ ...prevValue, [data]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_noactive}>
        {!active && (
          <>
            <div className={styles.input_form}>
              <span>Adicionar uma atividade</span>
              <button
                className={styles.iconBtn}
                onClick={() => setActive(!active)}
              >
                <div className={styles.addCircle}>
                  <AddCircleOutlineIcon />
                </div>
              </button>
            </div>
            <div className={styles.containner}>
              <p className={styles.textone}>
                Você ainda não possui tarefas cadastradas!
              </p>
              <p className={styles.texttwo}>Comece por aqui</p>
              <img className={styles.iconImg} src={iconImg} alt="arrow image" />
            </div>
          </>
        )}
      </div>
      <div>
        {active && (
          <div className={styled.container}>
            <header className={styled.header}>
              <button
                className={styled.button}
                onClick={() => setActive(!active)}
              >
                <img src={Images.icons.trashIcon} alt="trash icon" />
              </button>
            </header>
            <div className={styled.taskName}>
              <p>Nome da atividade</p>
              <InputText
                type={"block"}
                placeholder={"Placeholder"}
                hasIcon={true}
                nameInput={""}
                right={<img src={Images.icons.editBlackIcon} alt="edit icon" />}
                value={formData.taskName}
                onChange={(e) =>
                  handlerFormDataValues("taskName", e.target.value)
                }
              />
            </div>
            <div className={styled.taskData}>
              <p>Data</p>
              <DatePicker
                size={"block"}
                calendarPosition={"left"}
                placeholder={"Adicione uma Data"}
              />
            </div>
            <div className={styled.taskTime}>
              <p>Hora</p>
              <div className={styled.dropDown}>
                <Dropdown
                  setValue={(e) => {
                    handlerFormDataValues("startTime", e);
                  }}
                  value={formData.startTime}
                  width={252}
                  initialText={"14:30"}
                  options={Times}
                  id={"startTime"}
                  leftIcon={<div />}
                />
                <Dropdown
                  setValue={(e) => {
                    handlerFormDataValues("endTime", e);
                  }}
                  value={formData.endTime}
                  width={252}
                  initialText={"00:00"}
                  options={Times}
                  id={"endTime"}
                  leftIcon={<div />}
                />
              </div>
            </div>
            <div className={styled.taskTags}>
              <p>Tags</p>
              <div className={styled.label}>
                {[
                  "Reuniões Internas",
                  "Atividades Internas",
                  "Fup",
                  "1:1",
                  "Daily",
                ].map((tag) => (
                  <Tag
                    size={"micro"}
                    color={"dark"}
                    type={"tag"}
                    text={tag}
                    hasIcon={false}
                    active={formData.tag === tag}
                    setActive={handlerFormDataValues}
                  />
                ))}
              </div>
            </div>
            <div className={styled.taskStatus}>
              <p>Status</p>
              <div className={styled.label}>
                {["Prioridade", "Em Progresso", "Validação", "Concluído"].map(
                  (status) => (
                    <Tag
                      size={"micro"}
                      color={"dark"}
                      type={"status"}
                      text={status}
                      hasIcon={false}
                      active={formData.status === status}
                      setActive={handlerFormDataValues}
                    />
                  )
                )}
              </div>
            </div>
            <div className={styled.taskDescription}>
              <p>Descrição</p>
              <Textarea
                type={"block"}
                value={formData.description}
                onChangetext={(e) =>
                  handlerFormDataValues("description", e.target.value)
                }
                placeholder={"Adicione uma descrição"}
              />
            </div>
            <div className={styled.simpleBtn}>
              <SimpleButton
                size={"block"}
                text={"Finalizar Tarefa"}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTask;
