import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import style from "./Breadcrumb.module.css";
import { useNavigate } from "react-router-dom";

type BreadcrumbProps = {
  pathNames: Array<string>;
  pathLinks: Array<string>;
};

const Breadcrumb = ({ pathNames, pathLinks }: BreadcrumbProps) => {
  const navigate = useNavigate();
  const pathLastElementIndex = pathNames.length - 1;

  let directory = "";
  const pathArray: Array<string> = [];
  for (let i = 0; i < pathNames.length; i++) {
    directory += `/${pathLinks[i]}`;
    pathArray[i] = directory;
  }

  return (
    <nav className={style.breadcrumbContainer}>
      {pathNames.map((value, index) => {
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
        {pathNames[pathLastElementIndex]}
      </span>
    </nav>
  );
};

export default Breadcrumb;
