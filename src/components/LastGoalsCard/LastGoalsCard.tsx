import React from 'react'
import styles from "./LastGoalsCard.module.css"
import Images from "../../assets/index";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ProgressBar from '../ProgressBar/ProgressBar';


type cardProps = {
    quantityGoals: number;
    mounth: string;
    quantityGoalsCompleted: number;
}

const LastGoalsCard = ({quantityGoals, mounth, quantityGoalsCompleted}: cardProps) => {
  return (
    <div className={styles.LastGoalsCard_container}>
        <div className={styles.LastGoalsCard_title} >
            <img src={Images.LastGoalsFlag} alt="bandeira" />
            <h1>Últimas Metas</h1>
        </div>
        <div className={styles.LastGoalsCard_info} >
            <div className={styles.LastGoalsCard_inner} >
                <img src={Images.LastGoalsMedal} alt="medalha ultimas Goals" />
                <div className={styles.LastGoalsCard_inner_info}>
                    <h1>Avaliação de {mounth}</h1>
                    <p>{quantityGoals<10 ? `0${quantityGoals}` : quantityGoals} Metas</p>
                </div>
                <ArrowForwardIosRoundedIcon onClick={() => {}} className={styles.LastGoalsCard_arrow} />
            </div>
            <div className={styles.LastGoalsCard_line} ></div>
            <div className={styles.LastGoalsCard_progress} >
                <div className={styles.progress_Goals} >
                    <p>{quantityGoalsCompleted} </p>
                    <span>/{quantityGoals} </span>
                </div>
                <ProgressBar width={256} totalValue={quantityGoals} relativeValue={quantityGoalsCompleted}  />
                <img src={Images.LastGoalsAmpoule} alt="ampulheta" />
            </div>
        </div>
    </div>
  )
}

export default LastGoalsCard