import styles from "./TrilhasScreen.module.css";
import CardTrilhas from "./components/CardTrilhas/CardTrilhas";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { log } from "console";
import { useEffect, useState } from "react";

type Trilhas = { name: string; id: number; description: string };
const TrilhasScreen = () => {
  // const trails: Array<Trilhas> = [];

  const getTrails = async () => {
    // setTrilhas(await getTrails())
    return (await axios.get("http://localhost:4000/api/trail")).data;
  }


  // let trilhas: Array<Trilhas> = getTrails();

  const [trilhas, setTrilhas] = useState([]);

  // let trilhas: Array<Trilhas> = getTrails();

  const teste = async () => {
    setTrilhas(await getTrails())
  }

  useEffect(() => {
    teste();
  }, []);



  console.log(trilhas);



  const user = {
    id: 1,
    name: "Fernando",
    main: "engenharia",
    trilhas: [
      {
        trilha_id: 4,
        courses: [
          {
            course_id: 1,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: ["iax9dhaiudshasip1", "iax9dhaiudshasip1"],
            completed: true,
          },
          {
            course_id: 2,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: [],
            completed: true,
          },
        ],
      },
      {
        trilha_id: 1,
        courses: [
          {
            course_id: 1,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: ["iax9dhaiudshasip1", "iax9dhaiudshasip1"],
            completed: true,
          },
          {
            course_id: 2,
            lastWatched_class_id: "iax9dhaiudshasip1",
            watched: [],
            completed: false,
          },
        ],
      },
    ],
  };


  const courses = [
    {
      id: 1,
      name: "Nothink",
      trilha: 3,
      lastCourse: 4,
      completed: false,
      description: "descrição",
    },
    {
      id: 2,
      name: "NodeJS",
      trilha: 3,
      lastCourse: 24,
      completed: false,
      description: "descrição",
    },
    {
      id: 3,
      name: "Nothink",
      trilha: 4,
      lastCourse: 4,
      completed: false,
      description: "descrição",
    },
    {
      id: 4,
      name: "NodeJS",
      trilha: 4,
      lastCourse: 24,
      completed: false,
      description: "descrição",
    },
  ];

  const getProgressBarInputs = (id: number) => {
    let watched = 0;
    if (user.trilhas.filter((trilha) => trilha.trilha_id === id)[0] != null) {
      watched = user.trilhas
        .filter((trilha) => trilha.trilha_id === id)[0]
        .courses.filter((course) => course.completed == true).length;
    }
    const totalVideo = courses.filter((course) => course.trilha === id).length;
    return {
      totalVideo,
      watched,
    };
  };

  const getTrailTitle = (id: number) => {
    const title = trilhas.filter((trilha) => trilha.id === id)[0].name;

    return title[0].toUpperCase() + title.substring(1).toLowerCase();
  };

  const getTrailDescription = (id: number) => {
    const description = trails.filter((trail) => trail.id === id)[0]
      .description;
    return description;
  };

  const getPreviousTrailId = (id: number) => {
    if (id > 2) {
      return id - 1;
    } else {
      return trails.length;
    }
  };

  const getPreviousTrailName = (id: number) => {
    let name;
    let trail;
    if (id > 2) {
      trail = trilhas.find((trilha) => trilha.id === id - 1);
    } else {
      trail = trilhas.find((trilha) => trilha.id === trilhas.length);
    }
    if (trail == null) {
      return "";
    } else {
      name = trail.name;
      return name[0].toUpperCase() + name.substring(1).toLowerCase();
    }
  };

  const isBlocked = (id: number) => {
    if (
      trails[1].id === id ||
      id === 1 ||
      getProgressBarInputs(getPreviousTrailId(id)).watched > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const setTrails = () => {
    const main_id = trilhas.filter((trilha) => trilha.name === user.main)[0].id;
    trails.push(trilhas[0]);
    for (let i = main_id - 1; i < trilhas.length; i++) {
      trails.push(trilhas[i]);
    }
    for (let i = 1; i < main_id - 1; i++) {
      trails.push(trilhas[i]);
    }
  };

  setTrails();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <div className={styles.title}>Trilhas</div>
        <div className={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </div>
      </div>
      <div style={{ width: "704px" }}></div>
      {trails.map((item) => (
        <CardTrilhas
          key={item.id}
          inputTrilha={getProgressBarInputs(item.id)}
          onClick={() => navigate("" + item.id)}
          title={getTrailTitle(item.id)}
          description={getTrailDescription(item.id)}
          blocked={isBlocked(item.id)!}
          previous={getPreviousTrailName(item.id)}
        ></CardTrilhas>
      ))}
    </div>
  );
};

export default TrilhasScreen;
