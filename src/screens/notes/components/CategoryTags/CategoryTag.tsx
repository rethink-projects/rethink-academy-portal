import { useEffect, useState } from "react";

import style from "./CategoryTag.module.css";

import Images from "../../../../assets";

type categoryTagProps = {
  getCategories: (params: any) => any;
  sendCategories: Array<boolean>;
};

const CategoryTag = (props: categoryTagProps) => {
  const [hardSkills, setHardSkills] = useState(props.sendCategories[0]);
  const [softSkills, setSoftSkills] = useState(props.sendCategories[1]);
  const [desenvolvimentoPessoal, setDesenvolvimentoPessoal] = useState(
    props.sendCategories[2]
  );

  useEffect(() => {
    setHardSkills(props.sendCategories[0]);
    setSoftSkills(props.sendCategories[1]);
    setDesenvolvimentoPessoal(props.sendCategories[2]);
  }, [props.sendCategories]);

  const categoriesArray = [...props.sendCategories];
  let categories = categoriesArray;

  const handleClick = (index: number) => () => {
    switch (index) {
      case 0:
        setHardSkills((current) => !current);
        categories[index] = !hardSkills;
        categories[index + 1] = softSkills;
        categories[index + 2] = desenvolvimentoPessoal;

        break;
      case 1:
        setSoftSkills((current) => !current);
        categories[index] = !softSkills;
        categories[index - 1] = hardSkills;
        categories[index + 1] = desenvolvimentoPessoal;

        break;
      case 2:
        setDesenvolvimentoPessoal((current) => !current);
        categories[index] = !desenvolvimentoPessoal;
        categories[index - 2] = hardSkills;
        categories[index - 1] = softSkills;

        break;
    }

    props.getCategories(categories);
  };

  return (
    <div className={style.categories}>
      <button
        className={`${style.default} ${hardSkills ? style.active : ""} `}
        onClick={handleClick(0)}
      >
        <img src={Images.academyHat} />
        Hard Skills
      </button>
      <button
        className={`${style.default} ${softSkills ? style.active : ""} `}
        onClick={handleClick(1)}
      >
        <img src={Images.lamp} />
        Soft Skills
      </button>
      <button
        className={`${style.default} ${
          desenvolvimentoPessoal ? style.active : ""
        } `}
        onClick={handleClick(2)}
      >
        <img src={Images.desenvolvimentoPessoal} />
        Desenvolvimento Pessoal
      </button>
    </div>
  );
};

export default CategoryTag;
