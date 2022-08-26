import axios from "axios";

export const getTaskByUserEmail = async (email: string) => {
  try {
    console.log("getUserFromBackend");

    const { data } = await axios.get(
      `http://localhost:4000/api/tasks/${email}`
    );
    return data.tasks;
  } catch (error) {
    console.log(error);
    return;
  }
};
