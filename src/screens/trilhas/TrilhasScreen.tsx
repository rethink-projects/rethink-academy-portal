import styles from "./TrilhasScreen.module.css";
import CardTrilhas from "./components/CardTrilhas/CardTrilhas";
import { useEffect } from "react";

const TrilhasScreen = () => {
  const user = {
    id: 1,
    name: "Fernando",
    main: "engenharia",
    trilhas: [
      {
        trilha_id: 3,
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
        trilha_id: 3,
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

  let trilhas = [
    { name: "academy", id: 1, description: "descrição" },
    { name: "design", id: 2, description: "Descrição Design" },
    { name: "engenharia", id: 3, description: "Descrição Engenharia" },
    { name: "produto", id: 4, description: "Descrição Produto" },
  ];
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
  const getTrailInputs = (i: number) => {
    let totalVideo = 0;
    let watched = 0;
    if (user.trilhas.filter((trilha) => trilha.trilha_id === i)[0] != null) {
      watched = user.trilhas
        .filter((trilha) => trilha.trilha_id === i)[0]
        .courses.filter((course) => course.completed == true).length;
    }
    courses.forEach((course) => {
      if (course.trilha === i) {
        totalVideo++;
      }
    });
    return {
      totalVideo,
      watched,
    };
  };
  const getTrailTitle = (i: number) => {
    const title = trilhas.filter((trilha) => trilha.id === i)[0].name;

    return title[0].toUpperCase() + title.substring(1).toLowerCase();
  };
  const getTrailDescription = (i: number) => {
    const description = trilhas.filter((x) => x.id === i)[0].description;
    return description;
  };
  const getPreviousTrailId = (i: number) => {
    if (i > 2) {
      return i - 1;
    } else {
      return trilhas.length;
    }
  };
  const isBlocked = (i: number) => {
    if (
      trilhas[1].id === i ||
      i === 1 ||
      getTrailInputs(getPreviousTrailId(i)).watched > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  //reordena o array trilhas
  const main_id = trilhas.filter((trilha) => trilha.name === user.main)[0].id;
  let newArray = [];
  newArray.push(trilhas[0]);
  for (let i = main_id - 1; i < trilhas.length; i++) {
    newArray.push(trilhas[i]);
  }
  for (let i = 1; i < main_id - 1; i++) {
    newArray.push(trilhas[i]);
  }
  trilhas = newArray;

  return (
    <div className={styles.trilhas_container}>
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
        <div className={styles.cards_container}>
          {trilhas.map((item, index) => (
            <CardTrilhas
              key={item.id}
              inputTrilha={getTrailInputs(item.id)}
              onClick={() => console.log(item.id)}
              title={getTrailTitle(item.id)}
              description={getTrailDescription(item.id)}
              blocked={isBlocked(item.id)!}
            ></CardTrilhas>
          ))}
          {/* <CardTrilhas
            inputTrilha={getTrailInputs(3)}
            title={getTrailTitle(3)}
            description={getTrailDescription(3)}
          ></CardTrilhas> */}
          {/* <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas>
          <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas>
          <CardTrilhas
            inputTrilha={inputTrilha}
            title="Title"
            description="Description"
          ></CardTrilhas> */}
        </div>
      </div>
    </div>
  );
};

export default TrilhasScreen;
