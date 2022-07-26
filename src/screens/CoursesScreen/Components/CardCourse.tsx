import React from 'react'
import ButtonWithIconRight from '../../../components/ButtonWithIconRight/ButtonWithIconRight';
import styles from "./CardCourse.module.css";
import IconVerified from '@mui/icons-material/VerifiedOutlined';
import IconTask from '@mui/icons-material/TaskAltOutlined';

const CardCourse = () => {



    return (
        <div className={styles.container_card} >
            <div className={styles.content_card}>
                <div className={styles.description_card}>
                    <p className={styles.legend_card}>Curso | Rethink Academy</p>
                    <h1 className={styles.title_card}>Title</h1>
                    <div className={styles.container_status_card}>
                        <h2 className={styles.status_card}>Parabéns! Você concluiu esse curso!</h2>
                    </div>
                    {/* <div className={styles.container_status_card}>
                        <h2 className={styles.status_card}>Você ainda não terminou esse curso.</h2>
                    </div> */}
                    {/* <div className={styles.container_status_card}>
                        <h2 className={styles.status_card}>Você ainda não começou esse curso.</h2>
                    </div> */}
                </div>
                <div className={styles.actions_card}>
                    <ButtonWithIconRight type='primary' text='Ir para o curso' icon='arrow' size='medium' />
                    <ButtonWithIconRight type='secondary' text='Coletar emblema' icon='arrow' size='medium' />
                </div>
            </div>
        </div>
    )
}

export default CardCourse