import React from 'react'
import styles from "./CardUltimasMetas.module.css"
import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ProgressBar from '../ProgressBar/ProgressBar';


type cardProps = {
    quantityGoals: number;
    mounth: string;
    quantityGoalsCompleted: number;
}

const CardUltimasMetas = ({quantityGoals, mounth, quantityGoalsCompleted}: cardProps) => {
  return (
    <div className={styles.CardUltimasMetas_container}>
        <div className={styles.CardUltimasMetas_title} >
            <img src={Images.FlagUltimasMetas} alt="bandeira" />
            <h1>Últimas Metas</h1>
        </div>
        <div className={styles.CardUltimasMetas_info} >
            <div className={styles.CardUltimasMetas_inner} >
                <img src={Images.MedalUltimasMetas} alt="medalha ultimas Goals" />
                <div className={styles.CardUltimasMetas_inner_info}>
                    <h1>Avaliação de {mounth}</h1>
                    <p>{quantityGoals<10 ? `0${quantityGoals}` : quantityGoals} Metas</p>
                </div>
                <ArrowForwardIosRoundedIcon onClick={() => {}} className={styles.cardUltimasMetas_arrow} />
            </div>
            <div className={styles.CardUltimasMetas_line} ></div>
            <div className={styles.CardUltimasMetas_progress} >
                <div className={styles.progress_Goals} >
                    <p>{quantityGoalsCompleted} </p>
                    <span>/{quantityGoals} </span>
                </div>
                <ProgressBar width={256} totalValue={quantityGoals} relativeValue={quantityGoalsCompleted}  />
                <img src={Images.AmpulhetaUltimasMetas} alt="ampulheta" />
            </div>
        </div>
    </div>
  )
}

export default CardUltimasMetas