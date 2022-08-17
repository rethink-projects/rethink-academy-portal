import React from 'react'
import ModalTrilhas from '../../../../components/ModalTrilhas/ModalTrilhas'
import CloseIcon from '@mui/icons-material/Close';
import InputText from '../../../../components/InputText/InputText';
import styles from "./ModalEditCardTrilhas.module.css";
import Textarea from '../../../../components/Textarea/Textarea';


export const ModalEditCardTrilhas = () => {
    const placeholder = "Adicione aqui um texto que sintetize o que é e quais os objetivos de aprendizado desta trilha de conhecimento em questão..."

    return (
        <div>
            <ModalTrilhas title='Editar Trilha de Conhecimento' iconClose={<CloseIcon />} onClose={() => console.log('Close')} oneButton>
                <div className={styles.content}>
                    <InputText hasIcon={false} nameInput="nameTrail" placeholder='Exemplo: Academy' type='default' label='Nome da Trilha' />
                    <Textarea placeholder={placeholder} label="Descrição da Trilha" caption='Adicione o link para utilizar a imagem que deseja utilizar' />
                </div>
            </ModalTrilhas>
        </div>
    )
}
