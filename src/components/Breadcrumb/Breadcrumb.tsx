import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import style from "./Breadcrumb.module.css";
import { useNavigate, useLocation } from "react-router-dom";

type BreadcrumbProps = {
  pathTitles: Array<string>;
  pathLinks: Array<string>;
};
/* 
playground
      <div>
        <h3>Breadcrumb</h3>
        <Breadcrumb
          pathTitles={["Home", "Playground"]}
          pathLinks={["/", "playground"]}
        />
      </div>

*/

const Breadcrumb = ({ pathTitles, pathLinks }: BreadcrumbProps) => {
  const navigate = useNavigate();
  //const location = useLocation();
  const pathLastElementIndex = pathTitles.length - 1;

  let directory = "";
  const pathArray: Array<string> = [];
  for (let i = 0; i < pathTitles.length; i++) {
    directory += pathLinks[i];
    pathArray[i] = directory;
  }

  return (
    <nav className={style.breadcrumbContainer}>
      {pathTitles.map((value, index) => {
        if (index != pathLastElementIndex) {
          return (
            <>
              <span
                className={style.previousPages}
                onClick={() => navigate(pathArray[index])}
              >
                {value}
              </span>
              <KeyboardArrowRightIcon />
            </>
          );
        }
      })}
      <span className={style.currentPage}>
        {pathTitles[pathLastElementIndex]}
      </span>
    </nav>
  );
};

export default Breadcrumb;
