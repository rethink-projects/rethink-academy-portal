import ProgressBar from "../../../../../components/ProgressBar/ProgressBar";
import styles from "./CardCourseProgress.module.css";
import {
  UserProgressResponse,
  CourseProgressResponse,
} from "../../../../types/CourseTypes";

type CardCourseProgress = {
  user: UserProgressResponse;
  course: CourseProgressResponse;
};

const CardCourseProgress = ({ user, course }: CardCourseProgress) => {
  const getCompletedModules = () => {
    let modulesQnt = 0;
    course.modules.forEach((moduleToDo) => {
      if (user.completedModules.includes(moduleToDo.id)) modulesQnt++;
    });
    return modulesQnt;
  };

  return (
    <div className={styles.course_card_container}>
      <span>{course.name}</span>
      <div className={styles.stats_container}>
        <ProgressBar
          totalValue={course.modules.length}
          relativeValue={getCompletedModules()}
          width={220}
        />
        <span>
          {`${getCompletedModules()}/${course.modules.length} módulos`}
        </span>
      </div>
    </div>
  );
};

export default CardCourseProgress;
