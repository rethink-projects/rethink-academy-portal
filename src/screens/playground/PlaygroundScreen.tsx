import { useEffect, useState } from "react";
import { createTask } from "../../services/backend/Tasks";
import styles from "./Playground.module.css";

function PlaygroundScreen() {
  const [first, setfirst] = useState({ name: "AAAA", age: "25" });

  const handleClick = async () => {
    const teste = await createTask({
      name: "Gabriel 50",
      taskDate: "2022-08-28T03:00:00.000Z",
      startTime: "17:00",
      endTime: "18:00",
      tags: "tags",
      status: "status",
      description: "description",
      userEmail: "gabriel.melo@rethink.dev",
    });
    console.log(teste);
  };
  return (
    <div className={styles.playground_container}>
      <div className={styles.main_content}>
        <input type="text" value={first.name} />
        <input type="text" value={first.age} />

        <button onClick={() => handleClick()}>setData</button>
      </div>
    </div>
  );
}

export default PlaygroundScreen;
