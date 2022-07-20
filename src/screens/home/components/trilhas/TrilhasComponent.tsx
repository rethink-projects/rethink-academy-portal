import styles from "./TrilhasComponent.module.css"
import IconMap from '@mui/icons-material/MapOutlined';
import CardTrilhasHome from "./trilhasSubComponents/CardTrilhasHome";

type TrilhasComponentType = {
    name: string;
    dataInput: Object;
}
const TrilhasComponent = () => {
    return (
        <div className={styles.trilhas_container}>
            <div className={styles.trilhas_title_container}>
                <div className={styles.icon_container}><IconMap
                // style={{ width: "16.25px", height: "16.25px" }} 
                /></div>
                <span >Trilhas</span>
            </div>
            <CardTrilhasHome />
        </div>
    )
}

export default TrilhasComponent