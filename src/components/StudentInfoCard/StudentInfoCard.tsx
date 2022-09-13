import axios from "axios";
import React, { useEffect, useState } from "react";

import AvatarWithLevel from "../AvatarWithLevel/AvatarWithLevel";

import style from "./StudentInfoCard.module.css";

type StudentInfoCardProps = {
  studentEmail: string;
};

const StudentInfoCard = ({ studentEmail }: StudentInfoCardProps) => {
  const [student, setStudent] = useState<any>();
  const [studentMain, setStudentMain] = useState<string>();

  const getStudent = async () => {
    try {
      const studentInfo = await axios.get(
        `http://localhost:4000/api/user/${studentEmail}`
      );
      console.log(studentInfo.data);
      setStudent(studentInfo.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentMain = () => {
    switch (student.main) {
      case "ENGINEERING":
        setStudentMain("Engenharia");
        break;
      case "DESIGN":
        setStudentMain("Design");
        break;
      case "PRODUCT":
        setStudentMain("Produto");
        break;
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  useEffect(() => {
    if (student) {
      getStudentMain();
    }
  }, [student]);

  if (student) {
    return (
      <div className={style.cardContainer}>
        <div className={style.infoContainer}>
          <div className={style.avatarAndLevel}>
            <AvatarWithLevel
              studentLevel={student.level}
              avatarSource={`https://ui-avatars.com/api/?name=${student.name}+${student.surname}`}
            />
          </div>
          <h1>{`${student.name} ${student.surname}`}</h1>
          <div className={style.roleAndEmail}>
            <p>Estagiário(a) em {studentMain}</p>
            <p>{student.email}</p>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default StudentInfoCard;
