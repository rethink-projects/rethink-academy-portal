import React, { useState } from "react";
import ModalTrilhas from "../../../../components/ModalTrilhas/ModalTrilhas";
import CloseIcon from "@mui/icons-material/Close";
import InputText from "../../../../components/InputText/InputText";
import styles from "./ModalEditCardTrilhas.module.css";
import Textarea from "../../../../components/Textarea/Textarea";

type TypeModalEditCardTrilhas = {
  onClose: VoidFunction;
};

export const ModalEditCardTrilhas = ({ onClose }: TypeModalEditCardTrilhas) => {
  const [valueNameTrail, setValueNameTrail] = useState("");
  const [valueDescriptionTrail, setValueDescriptionTrail] = useState("");

  const onChangeNameTrail = (event: any) => {
    setValueNameTrail(event.target.value);
  };

  const onChangeDescriptionTrail = (event: any) => {
    setValueDescriptionTrail(event.target.value);
  };

  const handleConfirm = () => {
    setValueDescriptionTrail("");
    setValueNameTrail("");
  };

  const placeholder =
    "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado desta trilha de conhecimento em questão...";

  return (
    <div>
      <ModalTrilhas
        title="Editar Trilha de Conhecimento"
        iconClose={<CloseIcon />}
        onClose={onClose}
        oneButton
        onClickConfirm={handleConfirm}
        nameButtonGreen="Salvar alterações"
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
            <Textarea placeholder={placeholder} type="block" />
          </div>
          <InputText
            value={valueDescriptionTrail}
            hasIcon={false}
            nameInput="imageTrail"
            placeholder="https://Exemplo.com"
            type="block"
            label="Imagem de capa"
            onChange={onChangeDescriptionTrail}
            elementCaption="Adicione o link para utilizar a imagem que deseja utilizar"
          />
        </div>
      </ModalTrilhas>
    </div>
  );
};
