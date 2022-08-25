import React, { useState } from "react";

// css
import styles from "./AddTaskForm.module.css";
import "./AddTaskForm.css";

// assets
import Images from "../../../assets/index";

// components
import InputText from "../../InputText/InputText";
import Dropdown from "../../Dropdown/Dropdown";
import SimpleButton from "../../SimpleButton/SimpleButton";
import Tag from "../../Tag/Tag";
import { DatePicker } from "../../DatePicker/DatePicker";

function AddTaskForm() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.button}>
          <img src={Images.icons.trashIcon} alt="trash icon" />
        </button>
      </header>
      <div className={styles.taskName}>
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
      <div className={styles.taskData}>
        <p>Data</p>
        <DatePicker
          size={"default"}
          calendarPosition={"left"}
          placeholder={"Adicione uma Data"}
        />
      </div>
      <div className={styles.taskTime}>
        <p>Hora</p>
        <div className={styles.dropDown}>
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
            ]}
            id={"0"}
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
            ]}
            id={"0"}
            leftIcon={<div></div>}
          />
        </div>
      </div>
      <div className={styles.taskTags}>
        <p>Tags</p>
        <div className={styles.label}>
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
      <div className={styles.taskStatus}>
        <p>Status</p>
        <div className={styles.label}>
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
      <div className={styles.taskDescription}>
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
  );
}

export default AddTaskForm;
