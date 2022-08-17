import React from 'react'
import ModalTrilhas from '../../../../components/ModalTrilhas/ModalTrilhas'
import CloseIcon from '@mui/icons-material/Close';
import InputText from '../../../../components/InputText/InputText';
import styles from "./ModalEditCardTrilhas.module.css";
import Textarea from '../../../../components/Textarea/Textarea';

type TypeModalEditCardTrilhas = {
    onClose: VoidFunction;
    setValueNameTrail: string;
    setValueDescriptionTrail: string;
}

export const ModalEditCardTrilhas = ({ onClose, setValueNameTrail, setValueDescriptionTrail }: TypeModalEditCardTrilhas) => {
    const placeholder = "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado desta trilha de conhecimento em questão..."

    return (
        <div>
            <ModalTrilhas title='Editar Trilha de Conhecimento' iconClose={<CloseIcon />} onClose={onClose} oneButton>
                <div className={styles.content}>
                    <InputText value={setValueNameTrail} hasIcon={false} nameInput="nameTrail" placeholder='Exemplo: Academy' type='default' label='Nome da Trilha' />
                    <Textarea placeholder={placeholder} label="Descrição da Trilha" caption='Adicione o link para utilizar a imagem que deseja utilizar' />
                    <InputText value={setValueDescriptionTrail} hasIcon={false} nameInput="imageTrail" placeholder='https://Exemplo.com' type='default' label='Imagem de capa' />
                </div>
            </ModalTrilhas>
        </div>
    )
}
