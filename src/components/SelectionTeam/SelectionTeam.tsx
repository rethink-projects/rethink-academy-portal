import React, { useState, useEffect } from "react";

// Components
import Dropdown from "../Dropdown/Dropdown";

// Styles
import styles from "./SelectionTeam.module.css";

const SelectionTeam = () => {
  type Intern = {
    id: string;
    name: string;
    team: string;
    url: string;
    postion?: number;
    left?: number;
  };

  let linearGradient =
    "linear-gradient(0deg, rgba(218, 218, 218, 0.65), rgba(218, 218, 218, 0.65))";
  const [idSelected, setIdSelected] = useState("");

  const [interns, setInterns] = useState<Intern[]>([
    {
      id: "1",
      name: "Sthephany",
      team: "Engenharia",
      url: "https://cdn-icons-png.flaticon.com/512/7492/7492450.png",
    },
    {
      id: "2",
      name: "Hugo",
      team: "Produtos",
      url: "https://cdn-icons-png.flaticon.com/512/7492/7492454.png",
    },
    {
      id: "3",
      name: "Bernardo",
      team: "Design",
      url: "https://cdn-icons-png.flaticon.com/512/7492/7492477.png",
    },
    {
      id: "4",
      name: "Carol",
      team: "Engenharia",
      url: "https://cdn-icons-png.flaticon.com/512/7492/7492429.png",
    },
    {
      id: "5",
      name: "Fabi",
      team: "Engenharia",
      url: "https://cdn-icons-png.flaticon.com/512/7492/7492479.png",
    },
    {
      id: "6",
      name: "Raiane",
      team: "Design",
      url: "https://cdn-icons-png.flaticon.com/512/7492/7492498.png",
    },
  ]);

  const [internsCopy, setInternsCopy] = useState<Intern[]>(interns);

  const reloading = () => {
    let left = 0;

    setInterns((prevState) => {
      const data = prevState.map((intern, index) => {
        if (index !== 0) left += 30;
        return {
          ...intern,
          position: interns.length - index,
          left: left,
        };
      });
      setInternsCopy(data);
      return data;
    });
  };

  const handleIdSelected = (id: string) => {
    setIdSelected(id);
  };

  const [team, setTeam] = useState("");

  useEffect(() => {
    handleIdSelected("");
    if (team !== "Time") {
      let left = 5;

      setInternsCopy(interns.filter((Intern) => Intern.team === team));

      setInternsCopy((prevState) =>
        prevState.map((intern, index) => {
          if (index !== 0) left += 30;
          return {
            ...intern,
            position: internsCopy.length - index,
            left: left,
          };
        })
      );
    } else {
      setInternsCopy(interns);
    }
  }, [team]);

  useEffect(() => {
    reloading();
  }, []);

  return (
    <div className={styles.containerSelectionTeam}>
      <Dropdown
        options={["Design", "Engenharia", "Produtos", "Time"]}
        size="small"
        initialText="Time"
        width={123}
        id="team"
        setValue={setTeam}
      />
      <div className={styles.containerSelectionTeam_contentIcons}>
        {internsCopy.map((intern) => {
          return (
            <div
              onClick={() => handleIdSelected(intern.id)}
              key={intern.id}
              className={`${styles.containerSelectionTeam_contentIcons_image} ${styles.contentIcons_absolute}`}
              style={{
                backgroundImage:
                  idSelected === intern.id
                    ? `url(${intern.url})`
                    : `${linearGradient}, url(${intern.url}) `,
                backgroundSize: "cover",
                zIndex: intern.postion,
                left: intern.left,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionTeam;
