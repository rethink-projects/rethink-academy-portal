import React, { useState, useEffect } from "react";
import { isArray } from "util";
import { getAllStudent } from "../../services/backend/UserService";
// import { getAllStudents } from "../../services/backend/UserService";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Styles
import styles from "./SelectionTeam.module.css";

const SelectionTeam = () => {
  type Intern = {
    id: string;
    name: string;
    main: string;
    avatar: string;
    postion?: number;
    left?: number;
  };

  let linearGradient =
    "linear-gradient(0deg, rgba(218, 218, 218, 0.65), rgba(218, 218, 218, 0.65))";
  const [idSelected, setIdSelected] = useState("");

  const [usersData, setUserData] = useState<Intern[]>([]);

  const [interns, setInterns] = useState<Intern[]>(usersData);

  const internsDataForMap = (iternsArray: Intern[]) => {
    let left = 0;
    return iternsArray.map((intern, index) => {
      if (index !== 0) left += 30;
      return {
        ...intern,
        position: usersData.length - index,
        left: left,
      };
    });
  };

  const getUserData = async () => {
    const data = await getAllStudent();
    setUserData(data);
    setInterns(internsDataForMap(data));
  };

  const reloading = () => {
    if (usersData.length > 0) {
      setInterns(internsDataForMap(usersData));
    }
  };

  const handleIdSelected = (id: string) => {
    setIdSelected(id);
  };

  const [team, setTeam] = useState("");

  useEffect(() => {
    reloading();
    if (usersData.length === 0) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    handleIdSelected("");
    if (team !== "ALL") {
      setInterns(usersData.filter((Intern) => Intern.main === team));
      setInterns((prevState) => internsDataForMap(prevState));
    } else {
      setInterns(internsDataForMap(usersData));
    }
  }, [team]);

  if (usersData.length > 0) {
    return (
      <div className={styles.containerSelectionTeam}>
        <Dropdown
          options={["DESIGN", "ENGINEERING", "PRODUCT", "ALL"]}
          size="small"
          initialText="Time"
          width={123}
          id="team"
          value={team}
          setValue={setTeam}
        />

        <div className={styles.containerSelectionTeam_contentIcons}>
          {interns.length > 0 &&
            interns.map((intern) => {
              return (
                <div
                  onClick={() => handleIdSelected(intern.id)}
                  key={intern.id}
                  className={`${styles.containerSelectionTeam_contentIcons_image} ${styles.contentIcons_absolute}`}
                  style={{
                    backgroundImage:
                      idSelected === intern.id
                        ? `url(${intern.avatar})`
                        : `${linearGradient}, url(${intern.avatar}) `,
                    backgroundSize: "cover",
                    zIndex: intern.postion,
                    left: intern.left,
                  }}
                  id={intern.name}
                ></div>
              );
            })}
        </div>
      </div>
    );
  }
  return <div>carregando</div>;
};

export default SelectionTeam;
