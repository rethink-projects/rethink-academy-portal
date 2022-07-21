import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import style from "./Breadcrumb.module.css";
import { useNavigate, useLocation } from "react-router-dom";

type BreadcrumbProps = {
  breadcrumbItems: Array<BreadcrumbItemProps>;
};

type BreadcrumbItemProps = {
  title: string;
  link: string;
  current?: boolean;
};

/* 
playground
      <div>
        <h3>Breadcrumb</h3>
        <Breadcrumb
          breadcrumbItems={[
            { title: "home", link: "/" },
            { title: "playground", current: true, link: "playground" },
          ]}
        />
      </div>
*/

const Breadcrumb = ({ breadcrumbItems }: BreadcrumbProps) => {
  const navigate = useNavigate();
  //const location = useLocation();
  const pathLastElementIndex = breadcrumbItems.length - 1;

  let directory = "";
  const pathArray: Array<string> = [];
  for (let i = 0; i < breadcrumbItems.length; i++) {
    directory += breadcrumbItems[i].link;
    pathArray[i] = directory;
  }

  return (
    <nav className={style.breadcrumbContainer}>
      {breadcrumbItems.map((value, index) => {
        if (index != pathLastElementIndex) {
          return (
            <>
              <span
                className={style.previousPages}
                onClick={() => navigate(pathArray[index])}
              >
                {value.title}
              </span>
              <KeyboardArrowRightIcon />
            </>
          );
        }
      })}
      <span className={style.currentPage}>
        {breadcrumbItems[pathLastElementIndex].title}
      </span>
    </nav>
  );
};

export default Breadcrumb;
