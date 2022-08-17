import React from 'react'
import { useAuth } from '../../context/AuthContext';
import styles from "./EvaluationScreen.module.css";

const EvaluationScreen = () => {
    const { user } = useAuth();

//   if (user.) {
//     return <div>Loading...</div>;
//   }

    console.log(user);
  return (
    <div>EvaluationScreen</div>
  )
}

export default EvaluationScreen