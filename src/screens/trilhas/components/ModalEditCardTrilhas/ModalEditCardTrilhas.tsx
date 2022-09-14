import React, { useState } from "react";
import TrailModal from "../../../../components/TrailModal/TrailModal";
import InputText from "../../../../components/InputText/InputText";
import styles from "./ModalEditCardTrilhas.module.css";
import Textarea from "../../../../components/Textarea/Textarea";

type TypeModalEditCardTrilhas = {
  onClose: VoidFunction;
  onChangeNameTrail: (e: any) => void;
  onChangeDescriptionTrail: (e: any) => void;
  onChangeImageTrail: (e: any) => void;
  valueNameTrail: string;
  valueDescriptionTrail: string;
  valueImageTrail: string;
  handleConfirm: VoidFunction;
};

export const ModalEditCardTrilhas = ({
  onClose,
  onChangeNameTrail,
  onChangeDescriptionTrail,
  onChangeImageTrail,
  valueNameTrail,
  valueDescriptionTrail,
  valueImageTrail,
  handleConfirm,
}: TypeModalEditCardTrilhas) => {
  const placeholder =
    "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado desta trilha de conhecimento em questão...";

  return (
    <div>
      <TrailModal
        title="Editar Trilha de Conhecimento"
        onClose={onClose}
        oneButton
        onClickConfirm={handleConfirm}
        nameButtonRight="Salvar alterações"
      >
        <div className={styles.content}>
          <InputText
            value={valueNameTrail}
            hasIcon={false}
            nameInput="nameTrail"
            placeholder="Exemplo: Academy"
            type="block"
            label="Nome da Trilha"
            onChange={onChangeNameTrail}
          />
          <div className={styles.description}>
            <span className={styles.label_description}>
              Descrição da Trilha
            </span>
            <Textarea
              onChangetext={onChangeDescriptionTrail}
              placeholder={placeholder}
              type="block"
              value={valueDescriptionTrail}
            />
          </div>
          <InputText
            value={valueImageTrail}
            hasIcon={false}
            nameInput="imageTrail"
            placeholder="https://Exemplo.com"
            type="block"
            label="Imagem de capa"
            elementCaption="Adicione o link para utilizar a imagem que deseja utilizar"
            onChange={onChangeImageTrail}
          />
        </div>
      </TrailModal>
    </div>
  );
};
