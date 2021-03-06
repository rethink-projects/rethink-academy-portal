import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import style from "./Breadcrumb.module.css";
import { useNavigate } from "react-router-dom";

type BreadcrumbProps = {
  breadcrumbItems: Array<BreadcrumbItemProps>;
};

type BreadcrumbItemProps = {
  title: string;
  link: string;
};

const Breadcrumb = ({ breadcrumbItems }: BreadcrumbProps) => {
  const navigate = useNavigate();
  const currentPageIndex = breadcrumbItems.length - 1;

  return (
    <nav className={style.breadcrumbContainer}>
      {breadcrumbItems.map((value, index) => {
        if (index != currentPageIndex) {
          return (
            <>
              <span
                key={index}
                className={style.previousPages}
                onClick={() => navigate(breadcrumbItems[index].link)}
              >
                {value.title}
              </span>
              <KeyboardArrowRightIcon />
            </>
          );
        } else {
          return (
            <>
              <span className={style.currentPage} key={index}>
                {breadcrumbItems[currentPageIndex].title}
              </span>
            </>
          );
        }
      })}
    </nav>
  );
};

export default Breadcrumb;
