import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import styles from "./IndividualCard.module.css";

const IndividualCard = () => {
  return (
    <div className={styles.individual_card_container}>
      <img src="https://ui-avatars.com/api/?name=John+Doe" alt="" />
      <div className={styles.right_side}>
        <span>Um Nome Aqui</span>
        <ProgressBar totalValue={5} relativeValue={3} width={162} />
        <span> 4/12 módulos</span>
      </div>
    </div>
  );
};

export default IndividualCard;
