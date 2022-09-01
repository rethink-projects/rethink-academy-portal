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
import { DatePicker } from "../DatePicker/DatePicker";

function AddTask() {
  let iconImg = Images.arrowTask;
  const [active, setActive] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <p className={styles.title}>Registro de Tarefas</p>
      </div>
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
                type={"default"}
                placeholder={"Placeholder"}
                hasIcon={true}
                nameInput={""}
                right={<img src={Images.icons.editBlackIcon} alt="edit icon" />}
                value={""}
              />
            </div>
            <div className={styled.taskData}>
              <p>Data</p>
              <DatePicker
                size={"default"}
                calendarPosition={"left"}
                placeholder={"Adicione uma Data"}
              />
            </div>
            <div className={styled.taskTime}>
              <p>Hora</p>
              <div className={styled.dropDown}>
                <Dropdown
                  setValue={function (value: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  width={252}
                  initialText={"14:30"}
                  options={[
                    "00:00",
                    "00:15",
                    "00:30",
                    "00:45",
                    "01:00",
                    "01:15",
                    "01:30",
                    "01:45",
                    "02:00",
                    "02:15",
                    "02:30",
                    "02:45",
                    "03:00",
                    "03:15",
                    "03:30",
                    "03:45",
                    "04:00",
                    "04:15",
                    "04:30",
                    "04:45",
                    "05:00",
                    "05:15",
                    "05:30",
                    "05:45",
                    "06:00",
                    "06:15",
                    "06:30",
                    "06:45",
                    "07:00",
                    "07:15",
                    "07:30",
                    "07:45",
                    "08:00",
                    "08:15",
                    "08:30",
                    "08:45",
                    "09:00",
                    "09:15",
                    "09:30",
                    "09:45",
                    "10:00",
                    "10:15",
                    "10:30",
                    "10:45",
                    "11:00",
                    "11:15",
                    "11:30",
                    "11:45",
                    "12:00",
                    "12:15",
                    "12:30",
                    "12:45",
                    "13:00",
                    "13:15",
                    "13:30",
                    "13:45",
                    "14:00",
                    "14:15",
                    "14:30",
                    "14:45",
                    "15:00",
                    "15:15",
                    "15:30",
                    "15:45",
                    "16:00",
                    "16:15",
                    "16:30",
                    "16:45",
                    "17:00",
                    "17:15",
                    "17:30",
                    "17:45",
                    "18:00",
                    "18:15",
                    "18:30",
                    "18:45",
                    "19:00",
                    "19:15",
                    "19:30",
                    "19:45",
                    "20:00",
                    "20:15",
                    "20:30",
                    "20:45",
                    "21:00",
                    "21:15",
                    "21:30",
                    "21:45",
                    "22:00",
                    "22:15",
                    "22:30",
                    "22:45",
                    "23:00",
                    "23:15",
                    "23:30",
                    "23:45",
                  ]}
                  id={"startTime"}
                  leftIcon={<div></div>}
                />
                <Dropdown
                  setValue={function (value: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  width={252}
                  initialText={"00:00"}
                  options={[
                    "00:00",
                    "00:15",
                    "00:30",
                    "00:45",
                    "01:00",
                    "01:15",
                    "01:30",
                    "01:45",
                    "02:00",
                    "02:15",
                    "02:30",
                    "02:45",
                    "03:00",
                    "03:15",
                    "03:30",
                    "03:45",
                    "04:00",
                    "04:15",
                    "04:30",
                    "04:45",
                    "05:00",
                    "05:15",
                    "05:30",
                    "05:45",
                    "06:00",
                    "06:15",
                    "06:30",
                    "06:45",
                    "07:00",
                    "07:15",
                    "07:30",
                    "07:45",
                    "08:00",
                    "08:15",
                    "08:30",
                    "08:45",
                    "09:00",
                    "09:15",
                    "09:30",
                    "09:45",
                    "10:00",
                    "10:15",
                    "10:30",
                    "10:45",
                    "11:00",
                    "11:15",
                    "11:30",
                    "11:45",
                    "12:00",
                    "12:15",
                    "12:30",
                    "12:45",
                    "13:00",
                    "13:15",
                    "13:30",
                    "13:45",
                    "14:00",
                    "14:15",
                    "14:30",
                    "14:45",
                    "15:00",
                    "15:15",
                    "15:30",
                    "15:45",
                    "16:00",
                    "16:15",
                    "16:30",
                    "16:45",
                    "17:00",
                    "17:15",
                    "17:30",
                    "17:45",
                    "18:00",
                    "18:15",
                    "18:30",
                    "18:45",
                    "19:00",
                    "19:15",
                    "19:30",
                    "19:45",
                    "20:00",
                    "20:15",
                    "20:30",
                    "20:45",
                    "21:00",
                    "21:15",
                    "21:30",
                    "21:45",
                    "22:00",
                    "22:15",
                    "22:30",
                    "22:45",
                    "23:00",
                    "23:15",
                    "23:30",
                    "23:45",
                  ]}
                  id={"endTime"}
                  leftIcon={<div></div>}
                />
              </div>
            </div>
            <div className={styled.taskTags}>
              <p>Tags</p>
              <div className={styled.label}>
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Reuniões Internas"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Atividades Internas"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Fup"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"1:1"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Daily"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
            <div className={styled.taskStatus}>
              <p>Status</p>
              <div className={styled.label}>
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Prioridade"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Em Progresso"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Validação"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Tag
                  size={"micro"}
                  color={"dark"}
                  text={"Concluído"}
                  hasIcon={false}
                  onClickAdd={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onClickDelete={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
            <div className={styled.taskDescription}>
              <p>Descrição</p>
              <InputText
                type={"large"}
                placeholder={"Placeholder"}
                hasIcon={false}
                nameInput={""}
                value={""}
              />
            </div>
            <SimpleButton
              size={"small"}
              text={"Finalizar Tarefa"}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTask;
