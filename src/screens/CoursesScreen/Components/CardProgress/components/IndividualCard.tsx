import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import styles from "./IndividualCard.module.css";
import {
  UserProgressResponse,
  CourseProgressResponse,
} from "../../../../types/CourseTypes";

type IndividualCard = {
  user: UserProgressResponse;
  modulesQnt: number;
  course?: CourseProgressResponse;
};

const IndividualCard = ({ user, modulesQnt, course }: IndividualCard) => {
  const getCompletedModules = () => {
    if (!course) return user.completedModules.length;
    let modulesQnt = 0;
    course.modules.forEach((moduleToDo) => {
      if (user.completedModules.includes(moduleToDo.id)) modulesQnt++;
    });
    return modulesQnt;
  };

  return (
    <div className={styles.individual_card_container}>
      <img src={user.userImage} alt="" />
      <div className={styles.right_side}>
        <span>{user.userName}</span>
        <ProgressBar
          totalValue={modulesQnt}
          relativeValue={getCompletedModules()}
          width={162}
        />
        <span> {`${getCompletedModules()}/${modulesQnt} módulos`}</span>
      </div>
    </div>
  );
};

export default IndividualCard;
