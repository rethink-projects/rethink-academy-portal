import styles from "./TrilhasComponent.module.css"
import IconMap from '@mui/icons-material/MapOutlined';

const TrilhasComponent = () => {
    return (
        <div className={styles.trilhas_container}>
            <div className={styles.trilhas_title_container}>
                <div className={styles.icon_container}><IconMap /></div>
                <span >Trilhas</span>
            </div>
            <div>CARDS</div>
        </div>
    )
}

export default TrilhasComponent